import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { ReadingContext } from "../../context/ReadingsContext";
import { useContext } from "react";

const MonthlyConsumptionChart = () => {
  // Take your MockAPI data and reverse it so it reads chronologically from left to right
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error("dfdlfff");
  }

  const { items } = context;
  const chartData = [...items].slice(0, 6).reverse();

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4 w-full h-[400px]">
      <div>
        <h3 className="font-bold text-lg text-slate-800">Monthly Trends</h3>
        <p className="text-sm text-slate-500">Past 6 months comparison</p>
      </div>

      <div className="flex-1 w-full text-xs">
        <ResponsiveContainer width="50%" height="100%">
          {/* ComposedChart allows you to mix Bars and Lines in the same graph! */}
          <ComposedChart data={chartData} margin={{ left: -20, right: -10 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            {/* The Date floor matching your YYYY-MM-DD string database entries */}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })
              }
              className="text-slate-400 font-medium"
            />

            {/* Left Y-Axis: Measures the height of your energy usage bars */}
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              className="text-slate-400 font-medium"
            />

            {/* Right Y-Axis: Measures the height of your cost billing lines */}
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `US$${value}`}
              className="text-slate-400 font-medium"
            />

            {/* Magic hover card summary popups */}
            <Tooltip />

            {/* The Blue Consumption Bars matching the heights on your left YAxis */}
            <Bar
              yAxisId="left"
              dataKey="kwh"
              fill="#06b6d4"
              radius={[4, 4, 0, 0]}
              barSize={32}
            />

            {/* The Orange Cost Line overlay matching the values on your right YAxis */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cost"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 5, fill: "#f97316" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyConsumptionChart;
