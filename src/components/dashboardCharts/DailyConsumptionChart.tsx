import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ReadingContext } from "../../context/ReadingsContext";
import { useContext } from "react";

const DailyConsumptionChart = () => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error("No context found");
  }

  const { items } = context;

  const chartData = [...items].slice(0, 10).reverse();

  return (
    <div className=" flex flex-col bg-white shadow-md p-3 rounded-lg [&_.recharts-surface]:outline-none h-80">
      <div className="mb-5">
        <h1 className="font-bold text-lg">Daily Consumption</h1>
        <p className="text-sm text-slate-500">
          Past 10 days of energy usage and cost incurred
        </p>
      </div>

      <div className="text-xs  w-full flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 1" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })
              }
            />

            <YAxis />

            <Tooltip
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })
              }
            />

            <Line
              type="linear"
              dataKey="cost"
              strokeWidth={2}
              dot={{ r: 4, fill: "#f97316" }}
              stroke="#f97316"
            />

            <Line
              type="monotone"
              dataKey="kwh"
              stroke="#21c45d"
              strokeWidth={2}
              fill="#21c45d"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyConsumptionChart;
