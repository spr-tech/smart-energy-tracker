import DailyConsumptionChart from "../components/dashboardCharts/DailyConsumptionChart";
import MonthlyConsumptionChart from "../components/dashboardCharts/MonthlyConsumptionChart";
const DashBoard = () => {
  return (
    <>
      <div className=" outline-0 border-none focus:outline-none focus:ring-0">
        <header>
          <h1>DashBoard</h1>
          <span>Overview of your energy consumption</span>
        </header>

        <section>
          
        </section>
        <DailyConsumptionChart />

        <MonthlyConsumptionChart />
      </div>
    </>
  );
};

export default DashBoard;
