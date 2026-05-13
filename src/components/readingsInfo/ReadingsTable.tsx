import type { SetStateAction } from "react";
import type { Reading } from "../../type/types";
import { Trash2, Pencil } from "lucide-react";
import axios from "axios";
import Button from "../ui/Button";

type ReadingsTableProp = {
  items: Reading[];
  setItems: React.Dispatch<SetStateAction<Reading[]>>;
  setErrorMessage: React.Dispatch<SetStateAction<string | null>>;
};

const ReadingsTable = ({
  items,
  setItems,
  setErrorMessage,
}: ReadingsTableProp) => {
  const API_URL =
    "https://6a0371192afe8349b4b5376a.mockapi.io/api/energydata/energydata";

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        return setErrorMessage(err.message);
      }
    }
  };

  return (
    <>
      {/* Mobile view */}
      <div className=" md:hidden bg-white ">
        {items.map((item) => (
          <div
            className="ring ring-slate-200 p-3 flex flex-col gap-5"
            key={item.id}
          >
            {/* flex container for date and icon */}
            <div className="flex justify-between">
              <h1 className="sm:text-xl font-semibold">{item.date}</h1>
              <span className="flex gap-2 cursor-pointer">
                <button className="text-slate-600 hover:text-blue-600 transition-colors">
                  <Pencil size={20} />
                </button>
                <button className="text-red-500 hover:text-red-700 transition-colors">
                  <Trash2 size={20} />
                </button>
              </span>
            </div>

            {/* flex con for energy & cost */}
            <div className="flex gap-4 justify-around">
              <div className="flex flex-col gap-2">
                <span className="sm:text-lg text-slate-500">Energy</span>
                <span className="sm:font-semibold text-xl">{item.kwh} kwh</span>
              </div>

              <div className="flex flex-col">
                <span className="text-lg text-slate-500">cost </span>
                <span className=" sm:font-semibold text-xl">₦{item.cost}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <table className="hidden md:table  md:w-full md:table-fixed border-collapse bg-white m-0 p-0">
        <thead className="">
          <tr className="border-b border-b-slate-200 p-3 text-left text-xl">
            <th className="p-3 text-slate-400 font-semibold">Date</th>
            <th className="p-3 text-slate-400 font-semibold">Energy</th>
            <th className="p-3 text-slate-400 font-semibold">cost</th>
            <th className="p-3 text-slate-400 font-semibold">State</th>
            <th className="p-3 text-slate-400 font-semibold text-right ">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="">
          {items.map((item) => (
            <tr key={item.id} className="border-b border-b-slate-200  ">
              <td className="p-4 text-black text-lg font-semibold">
                {item.date}
              </td>
              <td className="p-4 text-black text-lg font-semibold">
                {item.kwh} kWh
              </td>
              <td className="p-4 text-black text-lg font-semibold">
                ₦{item.cost}
              </td>
              <td className="p-4 text-black text-lg font-semibold">
                {item.states}
              </td>
              <td className="p-4 ">
                <div className="flex items-center justify-end gap-3">
                  <Button className="text-slate-600 hover:text-blue-600 transition-colors">
                    <Pencil size={20} />
                  </Button>
                  <Button
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
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
