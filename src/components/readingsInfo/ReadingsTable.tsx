import type { Reading } from "../../type/types";

type ReadingsTableProp = {
  items: Reading[];
};

const ReadingsTable = ({ items }: ReadingsTableProp) => {
  return (
    <table className="w-full border-collapse bg-white m-0 p-0">
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
            <td className="p-4 text-black text-lg font-semibold">{item.kwh}</td>
            <td className="p-4 text-black text-lg font-semibold">
              {item.cost}
            </td>
            <td className="p-4 text-black text-lg font-semibold">{item.p}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReadingsTable;
