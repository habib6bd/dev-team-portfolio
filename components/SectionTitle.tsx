type SectionTitleProps = {
  label: string;
  title: string;
  description?: string;
};

export default function SectionTitle({ label, title, description }: SectionTitleProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-sm font-bold uppercase tracking-widest text-blue-700">{label}</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">{title}</h1>
      {description && <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>}
    </div>
  );
}