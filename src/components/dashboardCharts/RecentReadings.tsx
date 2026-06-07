import { ReadingContext } from "../../context/ReadingsContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const RecentReadings = () => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error("No context found");
  }

  const { items } = context;
  const recentReadings = items ? items.slice(0, 4) : [];

  return (
    <>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4 w-full ">
        <header className="flex justify-between">
          <div>
            <h1 className="font-bold text-slate-800 text-lg">
              Recent Readings
            </h1>
            <p className="text-sm text-slate-500">Latest logged entries</p>
          </div>

          <div>
            <Link
              to="/readings"
              className="bg-white shadow-sm border border-slate-300 py-1 px-3 rounded-lg"
            >
              View all
            </Link>
          </div>
        </header>

        <section className="flex flex-col gap-3">
          {recentReadings.map((item) => {
            const formattedDate = new Date(item.date).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              },
            );

            return (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-slate-100 pb-2"
              >
                <p className="text-md font-semibold text-slate-700">
                  {formattedDate}
                </p>

                <div className="flex flex-col items-center gap-1">
                  <p className="text-base font-bold text-slate-900">
                    {item.kwh} kWh
                  </p>
                  <span className="text-emerald-600 font-semibold text-sm">
                    ₦{item.cost}
                  </span>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default RecentReadings;
