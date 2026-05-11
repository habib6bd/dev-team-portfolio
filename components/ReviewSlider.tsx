"use client";

import { useEffect, useState } from "react";
import { reviews } from "@/data/siteData";

export default function ReviewSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const review = reviews[index];

  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">
      <p className="text-lg leading-8 text-slate-700">“{review.text}”</p>

      <div className="mt-6">
        <p className="font-bold">{review.name}</p>
        <p className="text-sm text-blue-700">{review.company}</p>
      </div>

      <div className="mt-6 flex gap-2">
        {reviews.map((item, i) => (
          <button
            key={item.name}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full ${i === index ? "w-8 bg-blue-700" : "w-2.5 bg-slate-300"}`}
          />
        ))}
      </div>
    </div>
  );
}