import type { Reading } from "../../type/types";
import { Trash2, Pencil } from "lucide-react";

type ReadingsTableProp = {
  items: Reading[];
};

const ReadingsTable = ({ items }: ReadingsTableProp) => {
  return (
    <>
      {/* Mobile view */}
      <div className="md:hidden">
        {items.map((item) => (
          <div className="">
            {/* flex con for date and icon */}
            <div className="flex justify-between">
              <h1>{item.date}</h1>
              <span className="flex gap-2">
                <Trash2 size={20} />
                <Pencil size={20} />
              </span>
            </div>

            {/* flex con for energy & cost */}
            <div className="flex gap-4">
              <div className="flex">
                <span>Energy</span>
                <span>{item.kwh}</span>
              </div>

              <div className="flex">
                <span>cost </span>
                <span>{item.cost}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <table className="hidden md:table md:w-full md:table-fixed border-collapse bg-white m-0 p-0">
        <thead className="">
          <tr className="border-b border-b-slate-200 p-3 text-left text-xl">
            <th className="p-3 text-slate-400 font-semibold">Date</th>
            <th className="p-3 text-slate-400 font-semibold">Energy</th>
            <th className="p-3 text-slate-400 font-semibold">cost</th>
            <th className="p-3 text-slate-400 font-semibold">Nptes</th>

            {/* <div className="flex justify-end"> */}
            <th className="p-3 text-slate-400 font-semibold text-center ">
              Actions
            </th>
            {/* </div> */}
          </tr>
        </thead>

        <tbody className="">
          {items.map((item) => (
            <tr key={item.id} className="border-b border-b-slate-200  ">
              <td className="p-4 text-black text-lg font-semibold">
                {item.date}
              </td>
              <td className="p-4 text-black text-lg font-semibold">
                {item.kwh}
              </td>
              <td className="p-4 text-black text-lg font-semibold">
                {item.cost}
              </td>
              <td className="p-4 text-black text-lg font-semibold">
                {item.states}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>

    //Desktop
  );
};

export default ReadingsTable;
