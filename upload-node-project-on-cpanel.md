# cPanel-এ Node প্রজেক্ট আপলোড করার নিয়ম (Kodenvia)

এই প্রজেক্ট cPanel shared hosting-এ তোলার পুরো প্রক্রিয়া, ধাপে ধাপে।
ইংরেজিতে বিস্তারিত সংস্করণ আছে `DEPLOYMENT.md`-এর 5A অংশে।

## সবার আগে একটি নিয়ম

**সার্ভারে কখনো "Run NPM Install" চাপবেন না এবং build চালাবেন না।**

cPanel বারবার install করতে বলবে ("Detected configuration files" বার্তা দিয়ে)।
উপেক্ষা করুন। আমাদের zip-এর ভেতরে `node_modules` আগে থেকেই সম্পূর্ণ আছে।
install চাপলে সার্ভারে শত শত process চলে, process limit পার হয়ে যায়, এবং
আমাদের `node_modules` ফোল্ডারও নষ্ট হতে পারে।

নিয়মটা হলো: build হয় নিজের কম্পিউটারে, সার্ভারে শুধু তৈরি ফাইল আপলোড হয়।

---

## প্রথমবার আপলোড

### ধাপ ১: আপলোডের ফাইল তৈরি করুন (নিজের কম্পিউটারে)

প্রজেক্ট ফোল্ডারে টার্মিনাল খুলে চালান:

```bash
NEXT_PUBLIC_SITE_URL=https://kodenvia.com npm run package
```

এতে প্রজেক্ট ফোল্ডারে `kodenvia-deploy.zip` তৈরি হয় (প্রায় ২০ MB)।
শুধু এই একটি ফাইলই আপলোড করতে হবে। এতে কোনো পাসওয়ার্ড বা secret থাকে না।

`NEXT_PUBLIC_SITE_URL` build-এর সময়ই সাইটের ভেতরে বসে যায়। পরে cPanel-এ
দিলে কাজ হবে না, তাই কমান্ডে দেওয়া জরুরি।

### ধাপ ২: Node ভার্সন দেখুন

1. cPanel → **Setup Node.js App** → **Create Application** খুলুন।
2. Node.js version তালিকায় **20.9 বা তার বেশি** আছে কি না দেখুন। 22 থাকলে
   সেটাই ভালো।
3. এখন অ্যাপ তৈরি করার দরকার নেই, শুধু দেখে বেরিয়ে আসুন। (চাইলে এখনই তৈরি
   করে **Stop** করে রাখতে পারেন, ক্ষতি নেই।)

শুধু 18 বা তার নিচের ভার্সন থাকলে সাইট চালু হবে না। তখন হোস্টিং কোম্পানিকে
নতুন Node ভার্সন দিতে বলতে হবে।

### ধাপ ৩: PostgreSQL ডাটাবেস তৈরি করুন

cPanel → **PostgreSQL Databases**:

1. **Create New Database:** নামের ঘরে সামনে `kodenvia_` আগে থেকেই বসানো
   থাকে (এটা cPanel অ্যাকাউন্টের নাম, বদলানো যায় না)। পরে `site` লিখুন।
   পুরো নাম হবে `kodenvia_site`।
2. **Add New User:** এখানেও একই prefix আসে। `admin` লিখলে পুরো নাম হবে
   `kodenvia_admin`। একটি লম্বা পাসওয়ার্ড দিন এবং কোথাও লিখে রাখুন।
   পাসওয়ার্ডে শুধু অক্ষর ও সংখ্যা ব্যবহার করুন; `@ # / :` দেবেন না।
3. **Add User to Database:** ওই user ও database বেছে নিয়ে Submit করুন।
   এই ধাপ বাদ গেলে সাইট ডাটাবেসে ঢুকতে পারবে না।

টেবিল বানাতে হবে না। সাইট প্রথমবার চালু হলে নিজেই বানিয়ে নেয়।

### ধাপ ৪: Connection string বানান

এটা cPanel-এর কোথাও থাকে না। Notepad-এ নিজে লিখে বানাতে হয়, পরে ধাপ ৬-এ
কাজে লাগবে।

তিনটি তথ্য লাগে, সবই **PostgreSQL Databases** পেজে পাওয়া যায়:

| তথ্য | কোথায় পাবেন |
|---|---|
| Database-এর পুরো নাম | **Current Databases** তালিকায় |
| User-এর পুরো নাম | **Current Users** তালিকায় |
| পাসওয়ার্ড | user বানানোর সময় যেটা দিয়েছিলেন। cPanel আর দেখায় না; ভুলে গেলে **Change Password** দিয়ে নতুন দিন |

ছাঁচ (কোথাও কোনো space থাকবে না):

```
postgresql://USER:PASSWORD@localhost:5432/DATABASE
```

উদাহরণ:

```
postgresql://kodenvia_admin:Abc12345xyz@localhost:5432/kodenvia_site
```

গঠনটা এরকম:

- `postgresql://` শুরুতে হুবহু এটাই
- user-এর পুরো নাম
- `:` (user আর পাসওয়ার্ডের মাঝে)
- পাসওয়ার্ড
- `@` (পাসওয়ার্ডের পরে, localhost-এর ঠিক আগে)
- `localhost:5432` হুবহু এটাই। host অবশ্যই `localhost` হবে
- `/` তারপর database-এর পুরো নাম

cPanel-এ তৈরি হওয়ার পর যে নাম দেখায়, হুবহু সেটাই ব্যবহার করুন। নাম লম্বা
হলে cPanel কখনো কখনো কেটে ছোট করে দেয়।

### ধাপ ৫: Node অ্যাপ তৈরি করুন

cPanel → **Setup Node.js App** → **Create Application**:

| ঘর | মান |
|---|---|
| Node.js version | 22 (না থাকলে 20.9+) |
| Application mode | Production |
| Application root | `kodenvia` (`public_html`-এর ভেতরে নয়) |
| Application URL | `kodenvia.com` |
| Application startup file | `server.js` |

উপরে ডানে **Create** চাপুন।

### ধাপ ৬: Environment variables যোগ করুন

অ্যাপ তৈরি হওয়ার পর একই পেজের নিচে **Environment variables** অংশ আসে।
**Add Variable** চেপে একটি একটি করে তিনটি যোগ করুন, প্রতিটির পর **Done**:

| নাম | মান |
|---|---|
| `DATABASE_URL` | ধাপ ৪-এর পুরো connection string |
| `DASHBOARD_PASSWORD` | ড্যাশবোর্ডে ঢোকার জন্য নিজের পছন্দের লম্বা পাসওয়ার্ড |
| `SESSION_SECRET` | নিচের কমান্ডের আউটপুট |

`SESSION_SECRET` বানাতে নিজের কম্পিউটারের টার্মিনালে চালান:

```bash
openssl rand -base64 32
```

- `PORT` নামে কিছু যোগ করবেন না।
- তিনটি হয়ে গেলে উপরে **Save** চাপুন।
- তারপর **Stop App** চেপে অ্যাপ বন্ধ রাখুন।

### ধাপ ৭: ফাইল আপলোড করুন

cPanel → **File Manager** → `kodenvia` ফোল্ডার খুলুন। নিশ্চিত হোন আপনি
`kodenvia` ফোল্ডারে আছেন, `public_html`-এ নয়।

1. উপরে ডানে **Settings** → **Show Hidden Files** চালু করুন। না করলে `.next`
   ফোল্ডার দেখা যাবে না।
2. cPanel-এর বানানো নমুনা ফাইল মুছুন:
   - `public` মুছুন
   - `server.js` মুছুন
   - `tmp` **রেখে দিন** (cPanel এটা অ্যাপ restart করতে ব্যবহার করে)
3. **Upload** দিয়ে `kodenvia-deploy.zip` আপলোড করুন।
4. zip সিলেক্ট করে **Extract** করুন, তারপর zip মুছে ফেলুন।

এখন `kodenvia` ফোল্ডারের ঠিক ভেতরেই এগুলো থাকতে হবে, কোনো সাব-ফোল্ডারের
ভেতরে নয়:

```
server.js
package.json
.next
node_modules
public
lib
tmp
```

### ধাপ ৮: চালু করুন

1. **Setup Node.js App**-এ ফিরে গিয়ে **Start App** চাপুন।
2. "Detected configuration files / Run NPM Install" বার্তা এলে উপেক্ষা করুন।
3. cPanel → **SSL/TLS Status**-এ kodenvia.com-এর HTTPS (AutoSSL) চালু আছে
   কি না দেখুন; না থাকলে চালু করুন।

### ধাপ ৯: পরীক্ষা করুন

1. `https://kodenvia.com` খুলুন। ডিজাইন ও ছবি ঠিকমতো আসছে কি না দেখুন।
2. `/hire-us` থেকে একটি টেস্ট enquiry পাঠান।
3. `/login`-এ `DASHBOARD_PASSWORD` দিয়ে ঢুকুন।
4. ড্যাশবোর্ডে enquiry-টি দেখা গেলে ডাটাবেস সংযোগ ঠিক আছে। তারপর সেটি মুছে দিন।

---

## পরে সাইট আপডেট করতে

প্রতিবার একই চারটি ধাপ:

1. নিজের কম্পিউটারে নতুন zip বানান:

   ```bash
   NEXT_PUBLIC_SITE_URL=https://kodenvia.com npm run package
   ```

2. cPanel → **Setup Node.js App** → **Stop App**।
3. **File Manager** → `kodenvia` ফোল্ডার থেকে এগুলো মুছুন: `.next`,
   `node_modules`, `public`, `lib`, `server.js`, `package.json`। `tmp` রেখে
   দিন। তারপর নতুন zip আপলোড করে **Extract** করুন এবং zip মুছে দিন।
4. **Start App**।

আগে মুছে নেওয়া জরুরি। প্রতিটি build-এ ফাইলের নাম আলাদা হয়, তাই পুরোনোর
উপর Extract করলে অকেজো ফাইল জমতে থাকে এবং disk-এর জায়গা নষ্ট হয়।

ডাটাবেস এবং environment variables আপডেটে বদলায় না; নতুন করে কিছু করতে হয় না।

---

## সমস্যা হলে

| লক্ষণ | কারণ ও সমাধান |
|---|---|
| অ্যাপ চালু হচ্ছে না | `kodenvia` ফোল্ডারের `stderr.log` ফাইলে আসল error লেখা থাকে। Node ভার্সন 20.9+ কি না, startup file `server.js` কি না, এবং `server.js` সরাসরি `kodenvia` ফোল্ডারে আছে কি না দেখুন। |
| সাইট আসছে কিন্তু ডিজাইন নেই | `.next` ফোল্ডার ঠিক জায়গায় নেই। Hidden files চালু করে আবার Extract করুন; zip যেন সাব-ফোল্ডারে Extract না হয়। |
| সাইট ঠিক আছে কিন্তু ছবি ভাঙা | এই হোস্টে image optimizer চলছে না। `next.config.ts`-এ `images`-এর ভেতরে `unoptimized: true` যোগ করে নতুন zip বানিয়ে আপলোড করুন। |
| ফর্ম বা ড্যাশবোর্ডে error | `DATABASE_URL` ভুল। prefix-সহ নাম, পাসওয়ার্ড, `@localhost`, এবং user-কে database-এ যোগ করা হয়েছে কি না দেখুন। |
| 503 বা "Resource limit reached" | process limit। কেউ সার্ভারে install বা build চালিয়েছে, অথবা পুরোনো process আটকে আছে। অ্যাপ Stop করুন, এক মিনিট অপেক্ষা করে Start দিন। |
| cPanel বলছে `node_modules` ফোল্ডার থাকা যাবে না | এই সতর্কতা শুধু cPanel-এর নিজের "Run NPM Install"-এর জন্য। সেটা চাপবেন না; আমাদের `node_modules` সম্পূর্ণ। |
| Postgres থেকে "too many connections" | সাইট সর্বোচ্চ ৩টি connection রাখে। একই অ্যাকাউন্টের অন্য সাইট বাকিগুলো ব্যবহার করছে। |

---

## অন্য Node প্রজেক্টের জন্য

একই নিয়ম খাটে: নিজের কম্পিউটারে build, সার্ভারে শুধু তৈরি ফাইল আপলোড, এবং
সার্ভারে কখনো npm install নয়। তবে `npm run package` কমান্ড এবং zip-এর গঠন
এই প্রজেক্টের জন্য আলাদা করে বানানো (`scripts/package.sh` এবং
`next.config.ts`-এর `output: "standalone"`)। অন্য প্রজেক্টে এগুলো আগে সেট
করে নিতে হবে।
