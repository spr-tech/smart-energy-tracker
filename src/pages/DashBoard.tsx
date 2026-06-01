import DailyConsumptionChart from "../components/dashboardCharts/DailyConsumptionChart";
import MonthlyConsumptionChart from "../components/dashboardCharts/MonthlyConsumptionChart";

import { ReadingContext } from "../context/ReadingsContext";
import { useContext, useMemo } from "react";
import { Zap, Banknote, Hourglass, Target } from "lucide-react";
import WeeklyConsumptionChart from "../components/dashboardCharts/WeeklyConsumptionChart";
import RecentReadings from "../components/dashboardCharts/RecentReadings";
import DashboardAlertBanner from "../components/DashboardAlertBanner";

const DashBoard = () => {
  const context = useContext(ReadingContext);

  if (!context) {
    throw new Error("ReadingContext should be inside a provider");
  }

  const { items } = context;

  // const latest = items?.[0];
  // const latestDate = latest ? new Date(latest.date) : null;
  // const latestMonth = latestDate?.getMonth();
  // const latestYear = latestDate?.getFullYear();

  const now = new Date();
  const latestMonth = now.getMonth();
  const latestYear = now.getFullYear();

  console.log(latestMonth);

  const goalLimit = useMemo(() => {
    try {
      const saved = localStorage.getItem("energy_goals");
      return saved ? JSON.parse(saved).energyLimit : 0;
    } catch {
      return 0;
    }
  }, []);

  const {
    totalOfCurrentMonthEnergy,
    totalOfCurrentMonthCost,
    dailyEnergyAverage,
  } = useMemo(() => {
    const totals = items.reduce(
      (totalPerIteration, item) => {
        const currentDate = new Date(item.date);

        if (
          currentDate.getMonth() === latestMonth &&
          currentDate.getFullYear() === latestYear
        ) {
          totalPerIteration.totalOfCurrentMonthEnergy += item.kwh;
          totalPerIteration.totalOfCurrentMonthCost += item.cost;
          totalPerIteration.totalTimesMonthOccurred += 1;
        }
        return totalPerIteration;
      },

      {
        totalOfCurrentMonthEnergy: 0,
        totalOfCurrentMonthCost: 0,
        totalTimesMonthOccurred: 0,
      },
    );

    const dailyEnergyAverage =
      totals.totalTimesMonthOccurred > 0
        ? totals.totalOfCurrentMonthEnergy / totals.totalTimesMonthOccurred
        : 0;

    return { ...totals, dailyEnergyAverage };
  }, [items, latestMonth, latestYear]);

  if (!items || items.length === 0) {
    return (
      <div className="p-5">
        <p className="text-slate-600">Loading dashboard info...</p>
      </div>
    );
  }

  return (
    <div className="outline-none border-none p-6">
      <DashboardAlertBanner />
      <header className="mb-5">
        <h1 className=" text-2xl font-bold text-slate-800">DashBoard</h1>
        <span className="text-slate-600">
          Overview of your energy consumption
        </span>
      </header>

      {/* Grid container with even card distribution */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1: Energy */}
        <div className="bg-white shadow-md rounded-lg p-5 flex justify-between ">
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
        <div className="bg-white shadow-md rounded-lg p-5 flex justify-between ">
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
        {/* Card 3 : Daily average */}
        <div className="bg-white shadow-md rounded-lg p-5 flex justify-between ">
          <div className="flex flex-col gap-2">
            <span className="text-slate-500 text-sm font-medium">
              Daily average
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
            <span className="text-2xl font-bold">
              {Math.max(0, goalLimit - totalOfCurrentMonthEnergy).toFixed(2)}{" "}
              kWh
            </span>
          </div>
          <Target className="text-button" />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md: md:gap-6 w-full">
        <DailyConsumptionChart />
        <WeeklyConsumptionChart />
        <MonthlyConsumptionChart />
        <RecentReadings />
      </section>
    </div>
  );
};

export default DashBoard;
