import { Trash2, Pencil } from "lucide-react";
import axios from "axios";
import Button from "../ui/Button";
import { useState, useContext } from "react";
import { ReadingContext } from "../../context/ReadingsContext";

// type ReadingsTableProp = {
//   items: Reading[];
//   setItems: React.Dispatch<SetStateAction<Reading[]>>;
//   setErrorMessage: React.Dispatch<SetStateAction<string | null>>;
//   apiurl: string;
//   handleEdit: (item: Reading) => void;
// };

const ReadingsTable = () => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error("ddfdgfd");
  }

  const { items, setItems, setFetchError, API_URL, handleEditReadings } =
    context;

  const [disableDeleteButton, setDisableDeleteButton] = useState<string | null>(
    null,
  );

  const [confirmDeleteItem, setConfirmDeleteItem] = useState<string | null>(
    null,
  );

  const handleDeleteConfirmation = (id: string) => {
    setConfirmDeleteItem(id);
  };

  const handleDelete = async (id: string) => {
    try {
      setDisableDeleteButton(id);

      await axios.delete(`${API_URL}/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setConfirmDeleteItem(null);
    } catch (err) {
      if (err instanceof Error) {
        return setFetchError(err.message);
      }
    } finally {
      setDisableDeleteButton(null);
    }
  };

  return (
    <div className="overflow-hidden w-full">
      {/* Mobile view */}
      {/* <div className=" md:hidden bg-white ">
        {items.map((item) => (
          <div
            className="ring ring-slate-200 p-3 flex flex-col gap-5"
            key={item.id}
          >
            {/* flex container for date and icon */}
      {/* <div className="flex justify-between">
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
      {/* <div className="flex gap-4 justify-around">
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
      </div>  */}

      {/* Desktop view */}
      <div className="overflow-x-auto"> 
        <table className="min-w-full md:table  md:w-full md:table-fixed border-collapse bg-white m-0 p-0">
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
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
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
                    <Button
                      className="text-slate-600 hover:text-blue-600 transition-colors"
                      onClick={() => handleEditReadings(item)}
                    >
                      <Pencil size={20} />
                    </Button>
                    <Button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => handleDeleteConfirmation(item.id)}
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                </td>
                {confirmDeleteItem === item.id && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
                    <div className="bg-white p-6 rounded-xl w-100">
                      <h1 className="text-xl font-semibold">Delete Reading?</h1>

                      <p className="mt-2 text-slate-500">
                        Are you sure you want to delete this reading?
                      </p>

                      <div className="flex justify-end gap-3 mt-5">
                        <Button
                          className=" hover:underline"
                          onClick={() => setConfirmDeleteItem(null)}
                        >
                          Cancel
                        </Button>

                        <Button
                          className="bg-red-600 hover:bg-red-400  p-2 rounded-xl text-white"
                          onClick={() => handleDelete(item.id)}
                          disabled={disableDeleteButton === item.id}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    //Desktop
  );
};

export default ReadingsTable;
