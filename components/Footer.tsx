export default function Footer() {
  return (
    <footer className="bg-slate-950 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 md:flex-row md:items-center">
        <div>
          <p className="text-2xl font-bold text-blue-300">DevTeam Studio</p>
          <p className="mt-2 text-sm text-slate-400">
            Professional web, SEO, and admin support team.
          </p>
        </div>

        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} DevTeam Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}