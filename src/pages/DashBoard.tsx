import DailyConsumptionChart from "../components/dashboardCharts/DailyConsumptionChart";
import MonthlyConsumptionChart from "../components/dashboardCharts/MonthlyConsumptionChart";

import { ReadingContext } from "../context/ReadingsContext";
import { useContext, useMemo, useState } from "react";
import { Zap, Banknote, Hourglass, Target } from "lucide-react";
import WeeklyConsumptionChart from "../components/dashboardCharts/WeeklyConsumptionChart";
import RecentReadings from "../components/dashboardCharts/RecentReadings";
import DashboardAlertBanner from "../components/DashboardAlertBanner";
import type { GoalLimits } from "../type/types";

const DashBoard = () => {
  const context = useContext(ReadingContext);

  if (!context) {
    throw new Error("ReadingContext should be inside a provider");
  }

  const { items, isLoading } = context;

  const GOAL_TOKEN = "energy_token";
  const [goals] = useState<GoalLimits>(() => {
    const saved = localStorage.getItem(GOAL_TOKEN);
    return saved
      ? JSON.parse(saved)
      : { energyLimit: 0, budgetLimit: 0, alertThreshold: 0 };
  });

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const daysElapsed = now.getDate();

  const {
    totalOfCurrentMonthEnergy,
    totalOfCurrentMonthCost,
    dailyEnergyAverage,
  } = useMemo(() => {
    const totals = items.reduce(
      (acc, item) => {
        const date = new Date(item.date);

        if (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        ) {
          acc.totalOfCurrentMonthEnergy += item.kwh;
          acc.totalOfCurrentMonthCost += item.cost;
        }
        return acc;
      },
      {
        totalOfCurrentMonthEnergy: 0,
        totalOfCurrentMonthCost: 0,
      },
    );

    const dailyEnergyAverage =
      daysElapsed > 0 ? totals.totalOfCurrentMonthEnergy / daysElapsed : 0;

    return { ...totals, dailyEnergyAverage };
  }, [items, currentMonth, currentYear, daysElapsed]);

  if (isLoading) {
    return (
      <div className="p-5">
        <p className="text-slate-600">Loading.... </p>
      </div>
    );
  }
  const remainingGoal = goals.energyLimit - totalOfCurrentMonthEnergy;

  return (
    <div className="outline-none border-none p-6">
      <DashboardAlertBanner />
      <header className="mb-5">
        <h1 className="text-2xl font-bold text-slate-800">DashBoard</h1>
        <span className="text-slate-600">
          Overview of your energy consumption
        </span>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1: Energy */}
        <div className="bg-white shadow-md rounded-lg p-5 flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-slate-500 text-sm font-medium">
              This Month Energy
            </span>
            <span className="text-2xl font-bold">
              {totalOfCurrentMonthEnergy} kWh
            </span>
          </div>
          <Zap className="text-button" />
        </div>

        {/* Card 2: Cost */}
        <div className="bg-white shadow-md rounded-lg p-5 flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-slate-500 text-sm font-medium">
              This Month Cost
            </span>
            <span className="text-2xl font-bold">
              ₦{totalOfCurrentMonthCost.toFixed(2)}
            </span>
          </div>
          <Banknote className="text-button" />
        </div>

        {/* Card 3: Daily Average */}
        <div className="bg-white shadow-md rounded-lg p-5 flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-slate-500 text-sm font-medium">
              Daily Average
            </span>
            <span className="text-2xl font-bold">
              {dailyEnergyAverage.toFixed(2)} kWh
            </span>
          </div>
          <Hourglass className="text-button" />
        </div>

        {/* Card 4: Remaining Goal */}
        <div className="bg-white shadow-md rounded-lg p-5 flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-slate-500 text-sm font-medium">
              Remaining Goal
            </span>
            <span className="text-2xl font-bold">{remainingGoal} kWh</span>
          </div>
          <Target className="text-button" />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 w-full">
        <DailyConsumptionChart />
        <WeeklyConsumptionChart />
        <MonthlyConsumptionChart />
        <RecentReadings />
      </section>
    </div>
  );
};

export default DashBoard;
