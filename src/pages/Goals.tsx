import { useContext, useMemo, useState } from "react";
import { ReadingContext } from "../context/ReadingsContext";
import Button from "../components/ui/Button";
import type { GoalLimits } from "../type/types";

const Goals = () => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error("ReadingContext must be inside a provider");
  }

  const { items } = context;

  const GOAL_TOKEN = "energy_token";

  const defaultGoals: GoalLimits = {
    energyLimit: 700,
    budgetLimit: 2000,
    alertThreshold: 89,
  };

  const [goals, setGoals] = useState<GoalLimits>(() => {
    const saved = localStorage.getItem(GOAL_TOKEN);
    return saved ? JSON.parse(saved) : defaultGoals;
  });

  const [updatedUserGoals, setUpdatedUserGoals] = useState<GoalLimits>(goals);

  const [saved, setSaved] = useState<boolean>(false);

  const changesBetweenGoals =
    goals.energyLimit !== updatedUserGoals.energyLimit ||
    goals.budgetLimit !== updatedUserGoals.budgetLimit ||
    goals.alertThreshold !== updatedUserGoals.alertThreshold;

  const currentMonthStats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return items.reduce(
      (acc, item) => {
        const date = new Date(item.date);

        if (
          currentMonth === date.getMonth() &&
          currentYear === date.getFullYear()
        ) {
          acc.kwh += item.kwh;
          acc.cost += item.cost;
        }

        return acc;
      },
      { kwh: 0, cost: 0 },
    );
  }, [items]);

  const daysRemainingInCurrentMonth = useMemo(() => {
    const now = new Date();
    const lastDay = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).getDate();

    return lastDay - now.getDate();
  }, []);

  const recentPerformance = useMemo(() => {
    const monthBox: Record<string, { kwh: number; cost: number }> = {};

    items.forEach((item) => {
      const date = new Date(item.date);

      const monthKey = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      if (!monthBox[monthKey]) {
        monthBox[monthKey] = { kwh: 0, cost: 0 };
      }

      monthBox[monthKey].kwh += item.kwh;
      monthBox[monthKey].cost += item.cost;
    });

    const now = new Date();
    const currentMonthKey = now.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    return Object.entries(monthBox)
      .filter(([month]) => month !== currentMonthKey)
      .map(([month, totals]) => ({ month, ...totals }));
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

  const isExceededThreshold = energyPercent >= 100 || budgetPercent >= 100;

  const statusLabel = isExceededThreshold
    ? "Exceeded"
    : isOverThreshold
      ? "Limit Reached"
      : "On Track";

  const statusColor = isExceededThreshold
    ? "bg-red-100 text-red-600"
    : isOverThreshold
      ? "bg-amber-100 text-amber-600"
      : "bg-green-100 text-green-600";

  const accentBorder = isExceededThreshold
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
    setGoals(updatedUserGoals);
    localStorage.setItem(GOAL_TOKEN, JSON.stringify(updatedUserGoals));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <div className="p-6">
        {/* Header section */}
        <div className="flex flex-col mb-5">
          <h1 className="font-bold text-2xl text-slate-800"> Goals & Limits</h1>
          <span className="text-slate-600 ">
            Set monthly targets and track your progress
          </span>
        </div>

        {/* Grid cards */}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Current month status card */}
          <div
            className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-3 ${accentBorder}`}
          >
            {/* header */}
            <header className="flex justify-between mb-5 ">
              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  Current Month Status
                </h3>
                <span className="text-slate-500 text-sm">
                  {daysRemainingInCurrentMonth} days remaining in month
                </span>
              </div>
              <div>
                <span className={`text-sm rounded-full p-2 ${statusColor}`}>
                  {statusLabel}
                </span>
              </div>
            </header>

            {/* Energy progress bar */}
            <section>
              <div className="flex flex-col gap-2">
                {/* the text */}
                <div className="flex justify-between">
                  <span className="text-sm text-slate-800">Energy Limit</span>
                  <span className="text-slate-400 text-sm">
                    {currentMonthStats.kwh.toFixed(1)}kwh /{" "}
                    {goals.energyLimit.toFixed(1)}kwh
                  </span>
                </div>

                {/* progress bar */}
                <div className="flex flex-col gap-1">
                  <div className="w-full h-2 rounded-full bg-slate-200">
                    <div
                      className={` h-2 rounded-full ${barColor(energyPercent)}`}
                      style={{ width: `${energyPercent}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>0</span>
                    <span>{energyPercent.toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              {/* Budget limit(cost) */}

              <div className="flex flex-col gap-1">
                {/* text */}
                <div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-800">Budget Limit</span>
                    <span className="text-slate-400 text-sm">
                      ₦{currentMonthStats.cost} / ₦{goals.budgetLimit}
                    </span>
                  </div>
                </div>

                {/* the gauge */}

                <div className="flex flex-col gap-1">
                  <div className="w-full h-2 rounded-full bg-slate-200  ">
                    <div
                      className={` transition-all h-2 rounded-full ${barColor(budgetPercent)}`}
                      style={{ width: `${budgetPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>0</span>
                    <span>{budgetPercent.toFixed(0)}%</span>
                  </div>{" "}
                </div>
              </div>
            </section>
          </div>

          {/* set goals card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4 ">
            <header>
              <h1 className="text-slate-800 text-sm font-semibold">
                Set Goals
              </h1>
              <span className="text-sm text-slate-500">
                Adjust your monthly limits and alerts
              </span>
            </header>

            <section className="flex flex-col gap-3">
              {/* Energy limit */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="energy"
                  className="text-sm font-medium text-slate-700"
                >
                  Monthly Energy Limit (kWh)
                </label>
                <input
                  type="number"
                  id="energy"
                  value={updatedUserGoals.energyLimit}
                  onChange={(e) =>
                    setUpdatedUserGoals((v) => ({
                      ...v,
                      energyLimit: Number(e.target.value),
                    }))
                  }
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* budget limit  */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="budget"
                  className="text-sm font-medium text-slate-700"
                >
                  Monthly Budget(NGN)
                </label>
                <input
                  type="number"
                  id="budget"
                  value={updatedUserGoals.budgetLimit.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  })}
                  onChange={(e) =>
                    setUpdatedUserGoals((v) => ({
                      ...v,
                      budgetLimit: Number(e.target.value),
                    }))
                  }
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Alert threshold */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <label
                    htmlFor="alert"
                    className="text-slate-800 text-sm font-medium"
                  >
                    Alert Threshold
                  </label>
                  <span className="text-slate-800 text-sm">
                    {updatedUserGoals.alertThreshold}%
                  </span>
                </div>

                <input
                  type="range"
                  min={10}
                  max={100}
                  value={updatedUserGoals.alertThreshold}
                  onChange={(e) =>
                    setUpdatedUserGoals((v) => ({
                      ...v,
                      alertThreshold: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-button"
                />
                <p className="text-xs text-slate-400">
                  Warn me when I reach {updatedUserGoals.alertThreshold}% of my
                  limit.
                </p>
              </div>

              <div className="w-full">
                <Button
                  onClick={handleSave}
                  disabled={!changesBetweenGoals && !saved}
                  className={`w-full text-white font-semibold py-3 rounded-xl transition-colors duration-200 ${
                    saved
                      ? "bg-green-400 cursor-default"
                      : changesBetweenGoals
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-slate-300 cursor-not-allowed"
                  }`}
                >
                  {saved ? "Saved ✓" : "Save Goals"}
                </Button>
              </div>
            </section>
          </div>
        </div>

        {/* Recent perfomance */}
        <footer className="mt-9 border border-slate-200 shadow-sm p-6 rounded-2xl bg-white ">
          <div className="flex flex-col gap-1">
            <h1 className="text-slate-800 text-sm font-semibold">
              Recent Perfomance
            </h1>
            <span className="text-sm text-slate-500  ">
              How you did do against your goals in previous months
            </span>
          </div>
          {recentPerformance.length === 0 ? (
            <div>no recent readings</div>
          ) : (
            <div className="divide-y divide-slate-200">
              {recentPerformance.map(({ month, kwh, cost }) => {
                const exceeded =
                  kwh > goals.energyLimit || cost > goals.budgetLimit;

                return (
                  <div
                    key={month}
                    className="flex items-center justify-between py-4 px-2"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {month}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {kwh.toFixed(1)} kWh used
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        ₦ {cost.toLocaleString()} <span>spent</span>
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
              })}
            </div>
          )}
        </footer>
      </div>
    </>
  );
};

export default Goals;
