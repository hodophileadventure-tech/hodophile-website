type RouteStop = {
  name: string;
  nights?: number;
};

export function RouteVisualizer({ stops }: { stops: RouteStop[] }) {
  if (stops.length === 0) {
    return <p className="text-sm leading-6 text-stone-500">Your selected route will take shape here.</p>;
  }

  return (
    <ol aria-label="Selected journey route" className="relative space-y-0">
      {stops.map((stop, index) => (
        <li key={`${stop.name}-${index}`} className="relative flex min-h-12 gap-3 pb-3 last:pb-0">
          {index < stops.length - 1 ? <span aria-hidden="true" className="absolute left-[5px] top-3 h-full w-px bg-stone-300" /> : null}
          <span aria-hidden="true" className={`relative z-10 mt-1.5 h-3 w-3 shrink-0 border-2 ${index === 0 || index === stops.length - 1 ? "border-[#fcc000] bg-[#fcc000]" : "border-stone-400 bg-white"}`} />
          <div className="flex min-w-0 flex-1 items-baseline justify-between gap-2">
            <span className="truncate text-sm font-medium text-stone-900">{stop.name}</span>
            {typeof stop.nights === "number" && stop.nights > 0 ? <span className="shrink-0 text-[10px] text-stone-500">{stop.nights} night{stop.nights === 1 ? "" : "s"}</span> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}