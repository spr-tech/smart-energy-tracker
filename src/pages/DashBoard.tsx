import DailyConsumptionChart from "../components/dashboardCharts/DailyConsumptionChart";
import MonthlyConsumptionChart from "../components/dashboardCharts/MonthlyConsumptionChart";

import { ReadingContext } from "../context/ReadingsContext";
import { useContext } from "react";
import { Zap } from "lucide-react";

const DashBoard = () => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error("ReadingContext should be inside a provider");
  }
  const { items } = context;

  const latest = items[0];

  const latestDate = new Date(latest.date);
  const latestMonth = latestDate.getMonth();
  const latestYear = latestDate.getFullYear();

  const totalOfCurrentMonthEnergy = items.reduce((total, item) => {
    const currentDate = new Date(item.date);

    if (
      currentDate.getMonth() === latestMonth &&
      currentDate.getFullYear() === latestYear
    ) {
      return total + item.kwh;
    }

    return total;
  }, 0);

  return (
    <>
      <div className=" outline-0 border-none focus:outline-none focus:ring-0">
        <header className="mb-5">
          <h1 className="text-3xl font-semibold">DashBoard</h1>
          <span className="text-slate-600">
            Overview of your energy consumption
          </span>
        </header>

        <section className="md:grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          {/* //cards */}
          <div className="bg-white shadow-md rounded-lg ">
            <aside className="flex justify-between p-5">
              <div className="flex flex-col gap-3">
                <span>This month Energy</span>
                <span className="text-2xl font-bold">
                  {totalOfCurrentMonthEnergy} kWh
                </span>
              </div>
              <div className="items-start">
                <Zap />
              </div>
            </aside>
          </div>

          <div className="bg-white shadow-md rounded-xl "></div>
          <div className="bg-white shadow-md rounded-md"></div>
          <div className="bg-white shadow-md rounded-md "></div>
        </section>

        <section>
          <DailyConsumptionChart />

          <MonthlyConsumptionChart />
        </section>
      </div>
    </>
  );
};

export default DashBoard;
