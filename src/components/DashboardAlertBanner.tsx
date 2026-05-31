import { useContext, useMemo } from "react";
import { ReadingContext } from "../context/ReadingsContext";

interface Goals {
  energyLimit: number;
  budgetLimit: number;
  alertThreshold: number;
}

const STORAGE_KEY = "energy_goals";

const DashboardAlertBanner = () => {
  const context = useContext(ReadingContext);
  if (!context) throw new Error("error");
  const { items } = context;

  const goals: Goals | null = useMemo(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }, []);

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

  if (!goals) return null;

  const energyPercent = (currentMonthStats.kwh / goals.energyLimit) * 100;
  const budgetPercent = (currentMonthStats.cost / goals.budgetLimit) * 100;

  const isExceeded = energyPercent >= 100 || budgetPercent >= 100;
  const isNearLimit =
    !isExceeded &&
    (energyPercent >= goals.alertThreshold ||
      budgetPercent >= goals.alertThreshold);

  const exceededItems = [];
  if (energyPercent >= 100)
    exceededItems.push(
      `energy limit (${currentMonthStats.kwh.toFixed(1)} / ${goals.energyLimit} kWh)`,
    );
  if (budgetPercent >= 100)
    exceededItems.push(
      `budget limit (₦${currentMonthStats.cost.toLocaleString()} / ₦${goals.budgetLimit.toLocaleString()})`,
    );

  const nearItems = [];
  if (energyPercent >= goals.alertThreshold && energyPercent < 100)
    nearItems.push(
      `energy at ${energyPercent.toFixed(0)}% (${currentMonthStats.kwh.toFixed(1)} / ${goals.energyLimit} kWh)`,
    );
  if (budgetPercent >= goals.alertThreshold && budgetPercent < 100)
    nearItems.push(
      `budget at ${budgetPercent.toFixed(0)}% (₦${currentMonthStats.cost.toLocaleString()} / ₦${goals.budgetLimit.toLocaleString()})`,
    );

  if (!isExceeded && !isNearLimit) return null;

  return (
    <div
      className={`w-full px-6 py-4 flex items-start gap-3 ${
        isExceeded
          ? "bg-red-50 border-b border-red-200"
          : "bg-amber-50 border-b border-amber-200"
      }`}
    >
      <div
        className={`mt-0.5 text-lg leading-none ${
          isExceeded ? "text-red-500" : "text-amber-500"
        }`}
      >
        {isExceeded ? "⛔" : "⚠️"}
      </div>

      <div className="flex flex-col gap-0.5">
        <p
          className={`text-sm font-semibold ${
            isExceeded ? "text-red-700" : "text-amber-700"
          }`}
        >
          {isExceeded ? "Usage Limit Exceeded" : "Approaching Usage Limit"}
        </p>
        <p
          className={`text-sm ${
            isExceeded ? "text-red-600" : "text-amber-600"
          }`}
        >
          {isExceeded
            ? `You have exceeded your ${exceededItems.join(" and ")} this month.`
            : `You are nearing your ${nearItems.join(" and ")} this month.`}
        </p>
      </div>

      <a
        href="/goals"
        className={`ml-auto text-xs font-semibold whitespace-nowrap underline underline-offset-2 ${
          isExceeded ? "text-red-600" : "text-amber-600"
        }`}
      >
        View Goals
      </a>
    </div>
  );
};

export default DashboardAlertBanner;
