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
    throw new Error("dfdlfff");
  }

  const { items } = context;

  const chartData = [...items].slice(0, 10).reverse();

  return (
    <ResponsiveContainer width="100%" height={400}>
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
            new Date(value).toLocaleDateString("en-GB", {
              month: "short",
              year: "numeric",
            })
          }
        />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="cost" fill="#888541" />
        <Line type="monotone" dataKey="kwh" stroke="#8884d8" fill="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DailyConsumptionChart;
