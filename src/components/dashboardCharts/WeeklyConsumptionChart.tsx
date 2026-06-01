import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { ReadingContext } from "../../context/ReadingsContext";
import { useContext, useMemo } from "react";

const WeeklyConsumptionChart = () => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error("No context found");
  }

  const { items } = context;

  const weeklyDataUsage = useMemo(() => {
    if (!items || items.length === 0) return [];

    const totalPerWeek = items.reduce(
      (acc, item) => {
        const currentDate = new Date(item.date);
        const dayOfWeek = currentDate.getDay();

        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - dayOfWeek);

        const weekKey = weekStart.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        if (!acc[weekKey]) {
          acc[weekKey] = { kwh: 0, cost: 0 };
        }

        acc[weekKey].kwh += item.kwh;
        acc[weekKey].cost += item.cost;

        return acc;
      },
      {} as Record<string, { kwh: number; cost: number }>,
    );

    const processedData = Object.entries(totalPerWeek).map(
      ([week, totals]) => ({
        name: week,
        kwh: totals.kwh,
        cost: totals.cost,
      }),
    );

    return processedData.slice(0, 7).reverse();
  }, [items]);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4 w-full h-100 [&_.recharts-surface]:outline-none">
      <div>
        <h3 className="font-bold text-lg text-slate-800">Weekly Trends</h3>
        <p className="text-sm text-slate-500">Past 7 weeks comparison</p>
      </div>

      <div className="flex-1 w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={weeklyDataUsage}
            margin={{ left: -20, right: -10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />

            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              className="text-slate-400 font-medium"
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₦${value}`}
            />

            <Tooltip />

            <Bar
              yAxisId="left"
              dataKey="kwh"
              fill="#21c45d"
              radius={[4, 4, 0, 0]}
              barSize={32}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cost"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 4, fill: "#f97316" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyConsumptionChart;
