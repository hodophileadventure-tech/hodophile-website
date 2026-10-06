import { Check } from "lucide-react";

export type PlannerStep = {
  number: number;
  label: string;
};

type TripPlannerProgressProps = {
  steps: PlannerStep[];
  currentStep: number;
  completion: number;
  completedSteps: boolean[];
  error: string;
  onSelectStep: (step: number) => void;
};

export function TripPlannerProgress({
  steps,
  currentStep,
  completion,
  completedSteps,
  error,
  onSelectStep,
}: TripPlannerProgressProps) {
  return (
    <nav aria-label="Trip designer progress" className="border-y border-stone-200 bg-white px-1 py-5 sm:px-3">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">Your journey, step by step</p>
          <p className="mt-1 text-sm font-semibold text-stone-950">{String(currentStep).padStart(2, "0")} / {String(steps.length).padStart(2, "0")} · {steps[currentStep - 1]?.label}</p>
        </div>
        <span className="text-xs font-semibold tabular-nums text-stone-600">{completion}% complete</span>
      </div>
      <div
        className="mb-4 h-1 overflow-hidden bg-stone-200"
        role="progressbar"
        aria-label="Trip details completed"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={completion}
      >
        <div className="h-full bg-[#fcc000] transition-[width] duration-500" style={{ width: `${completion}%` }} />
      </div>
      <ol className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {steps.map((step) => {
          const isCurrent = step.number === currentStep;
          const isComplete = completedSteps[step.number - 1] && step.number < currentStep;
          const canGoBack = step.number < currentStep;

          return (
            <li key={step.number}>
              <button
                type="button"
                onClick={() => onSelectStep(step.number)}
                disabled={!canGoBack && !isCurrent}
                aria-current={isCurrent ? "step" : undefined}
                className={`flex min-h-12 w-full items-center justify-center gap-1.5 border-b-2 px-1 py-2 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00] sm:justify-start sm:px-2 ${
                  isCurrent
                    ? "border-[#fcc000] text-stone-950"
                    : isComplete
                      ? "border-stone-300 text-stone-700 hover:border-[#fcc000]"
                      : "border-transparent text-stone-400"
                }`}
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center text-[10px] font-bold ${isCurrent ? "bg-[#fcc000] text-stone-950" : isComplete ? "bg-stone-950 text-white" : "bg-stone-100 text-stone-500"}`}>
                  {isComplete ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : String(step.number).padStart(2, "0")}
                </span>
                <span className="hidden text-left text-[10px] font-semibold uppercase leading-tight tracking-[0.06em] sm:block">{step.label}</span>
                <span className="sr-only sm:hidden">{step.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
      {error ? <p role="alert" className="mt-3 border-l-2 border-red-600 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p> : null}
    </nav>
  );
}