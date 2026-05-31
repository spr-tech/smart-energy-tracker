import { useState, useContext, useMemo } from "react";
import { ReadingContext } from "../context/ReadingsContext";

type Goals = {
  energyLimit: number;
  budgetLimit: number;
  alertThreshold: number;
};

const STORAGE_KEY = "energy_goals";

const defaultGoals: Goals = {
  energyLimit: 300,
  budgetLimit: 50000,
  alertThreshold: 80,
};

const GoalsAndLimits = () => {
  const context = useContext(ReadingContext);
  if (!context) throw new Error("No context found");
  const { items } = context;

  const [goals, setGoals] = useState<Goals>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultGoals;
    } catch {
      return defaultGoals;
    }
  });

  const [formValues, setFormValues] = useState<Goals>(goals);
  const [saved, setSaved] = useState(false);

  const hasChanges =
    formValues.energyLimit !== goals.energyLimit ||
    formValues.budgetLimit !== goals.budgetLimit ||
    formValues.alertThreshold !== goals.alertThreshold;

  const currentMonthStats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return items.reduce(
      (acc, item) => {
        const date = new Date(item.date);
        if (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        ) {
          acc.kwh += item.kwh;
          acc.cost += item.cost;
        }
        return acc;
      },
      { kwh: 0, cost: 0 },
    );
  }, [items]);

  const daysRemainingInMonth = useMemo(() => {
    const now = new Date();
    const lastDay = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).getDate();
    return lastDay - now.getDate();
  }, []);

  const recentPerformance = useMemo(() => {
    const monthMap: Record<string, { kwh: number; cost: number }> = {};

    items.forEach((item) => {
      const date = new Date(item.date);
      const key = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      if (!monthMap[key]) monthMap[key] = { kwh: 0, cost: 0 };
      monthMap[key].kwh += item.kwh;
      monthMap[key].cost += item.cost;
    });

    const now = new Date();
    const currentKey = now.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    return Object.entries(monthMap)
      .filter(([key]) => key !== currentKey)
      .map(([month, totals]) => ({ month, ...totals }))
      .slice(-6)
      .reverse();
  }, [items]);

  const energyPercent = Math.min(
    (currentMonthStats.kwh / goals.energyLimit) * 100,
    100,
  );
  const budgetPercent = Math.min(
    (currentMonthStats.cost / goals.budgetLimit) * 100,
    100,
  );

  const isOverThreshold =
    energyPercent >= goals.alertThreshold ||
    budgetPercent >= goals.alertThreshold;
  const isExceeded = energyPercent >= 100 || budgetPercent >= 100;

  const statusLabel = isExceeded
    ? "Exceeded"
    : isOverThreshold
      ? "Near Limit"
      : "On Track";

  const statusColor = isExceeded
    ? "bg-red-100 text-red-600"
    : isOverThreshold
      ? "bg-amber-100 text-amber-600"
      : "bg-green-100 text-green-600";

  const accentBorder = isExceeded
    ? "border-l-4 border-l-red-400"
    : isOverThreshold
      ? "border-l-4 border-l-amber-400"
      : "border-l-4 border-l-green-400";

  const barColor = (percent: number) => {
    if (percent >= 100) return "bg-red-500";
    if (percent >= goals.alertThreshold) return "bg-amber-400";
    return "bg-green-500";
  };

  const handleSave = () => {
    setGoals(formValues);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Goals & Limits</h2>
        <p className="text-sm text-slate-500 mt-1">
          Set monthly targets and track your progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Month Status */}
        <div
          className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-5 ${accentBorder}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800">Current Month Status</h3>
              <p className="text-sm text-slate-400 mt-0.5">
                {daysRemainingInMonth} days remaining in month
              </p>
            </div>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusColor}`}
            >
              {statusLabel}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm font-medium text-slate-700">
              <span>Energy Limit</span>
              <span>
                {currentMonthStats.kwh.toFixed(1)} kWh /{" "}
                {goals.energyLimit.toFixed(1)} kWh
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${barColor(energyPercent)}`}
                style={{ width: `${energyPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>0</span>
              <span>{energyPercent.toFixed(0)}%</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm font-medium text-slate-700">
              <span>Budget Limit</span>
              <span>
                ₦{currentMonthStats.cost.toLocaleString()} / ₦
                {goals.budgetLimit.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${barColor(budgetPercent)}`}
                style={{ width: `${budgetPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>0</span>
              <span>{budgetPercent.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Set Goals Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-5">
          <div>
            <h3 className="font-bold text-slate-800">Set Goals</h3>
            <p className="text-sm text-slate-400 mt-0.5">
              Adjust your monthly limits and alerts.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Monthly Energy Limit (kWh)
            </label>
            <input
              type="number"
              value={formValues.energyLimit}
              onChange={(e) =>
                setFormValues((v) => ({
                  ...v,
                  energyLimit: Number(e.target.value),
                }))
              }
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Monthly Budget (₦)
            </label>
            <input
              type="number"
              value={formValues.budgetLimit}
              onChange={(e) =>
                setFormValues((v) => ({
                  ...v,
                  budgetLimit: Number(e.target.value),
                }))
              }
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm font-medium text-slate-700">
              <span>Alert Threshold</span>
              <span>{formValues.alertThreshold}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={formValues.alertThreshold}
              onChange={(e) =>
                setFormValues((v) => ({
                  ...v,
                  alertThreshold: Number(e.target.value),
                }))
              }
              className="w-full accent-green-500"
            />
            <p className="text-xs text-slate-400">
              Warn me when I reach {formValues.alertThreshold}% of my limit.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={!hasChanges && !saved}
            className={`w-full text-white font-semibold py-3 rounded-xl transition-colors duration-200 ${
              saved
                ? "bg-green-400 cursor-default"
                : hasChanges
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            {saved ? "Saved ✓" : "Save Goals"}
          </button>
        </div>
      </div>

      {/* Recent Performance */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
        <div>
          <h3 className="font-bold text-slate-800">Recent Performance</h3>
          <p className="text-sm text-slate-400 mt-0.5">
            How you did against your goals in previous months
          </p>
        </div>

        <div className="flex flex-col divide-y divide-slate-100">
          {recentPerformance.length === 0 ? (
            <p className="text-sm text-slate-400 py-4">
              No previous months data yet.
            </p>
          ) : (
            recentPerformance.map(({ month, kwh, cost }) => {
              const exceeded =
                kwh > goals.energyLimit || cost > goals.budgetLimit;
              return (
                <div
                  key={month}
                  className="flex items-center justify-between py-4 px-2 rounded-lg hover:bg-slate-50 transition-colors duration-150"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {month}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {kwh.toFixed(1)} kWh used · ₦{cost.toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      exceeded
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {exceeded ? "Exceeded" : "Goal Met"}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsAndLimits;
