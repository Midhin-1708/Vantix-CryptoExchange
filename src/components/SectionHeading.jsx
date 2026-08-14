export default function SectionHeading({ title, subtitle, action }) {
  return (
    <div className="flex min-h-[118px] w-full items-start justify-between border-b border-border py-3">
      <div className="min-w-0 pl-4">
        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-slate-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-0.5 text-xs text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="mr-4 shrink-0 pt-1">
          {action}
        </div>
      )}
    </div>
  );
}