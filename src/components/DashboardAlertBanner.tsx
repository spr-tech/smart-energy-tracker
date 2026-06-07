import { useContext, useState, useMemo } from "react";
import { ReadingContext } from "../context/ReadingsContext";
import type { GoalLimits } from "../type/types";

const GOAL_TOKEN = "energy_token";
console.log(GOAL_TOKEN);

const DashboardAlertBanner = () => {
  const context = useContext(ReadingContext);
  if (!context) throw new Error("ReadingContext must be in a provider");

  const { items } = context;

  const [goals] = useState<GoalLimits>(() => {
    const saved = localStorage.getItem(GOAL_TOKEN);
    console.log(saved);
    return saved
      ? JSON.parse(saved)
      : { energyLimit: 0, budgetLimit: 0, alertThreshold: 0 };
  });

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

  const energyPercent = (currentMonthStats.kwh / goals.energyLimit) * 100;
  const budgetPercent = (currentMonthStats.cost / goals.budgetLimit) * 100;

  const atLimit =
    energyPercent >= goals.alertThreshold ||
    budgetPercent >= goals.alertThreshold;

  const exceededLimit = energyPercent >= 100 || budgetPercent >= 100;

  const alertMessage = exceededLimit
    ? "Energy and cost have exceeded the set threshold for the month."
    : atLimit
      ? "Energy and cost for the month have reached the limit set."
      : null;

  if (!alertMessage) return null;
  // const limitExeeded =

  return (
    <div
      className={`border-x-4 px-4 py-3 rounded mb-4 font-medium ${
        exceededLimit
          ? "bg-red-100 border-red-400 text-red-800"
          : atLimit
            ? "bg-yellow-50 border-yellow-400 text-yellow-800"
            : null
      }`}
    >
      {alertMessage}
    </div>
  );
};

export default DashboardAlertBanner;
