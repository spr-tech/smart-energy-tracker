import { Trash2, Pencil } from "lucide-react";
import axios from "axios";
import Button from "../ui/Button";
import { useState, useContext } from "react";
import { ReadingContext } from "../../context/ReadingsContext";

const ReadingsTable = () => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error("ReadingContext must be used inside a Provider");
  }

  const {
    items,
    setItems,
    setFetchError,
    API_URL,
    handleEditReadings,
    setSuccessMessage,
  } = context;

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
      setSuccessMessage("Reading deleted successfully");
      setTimeout(() => setSuccessMessage(null), 2000);
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
      <div className="overflow-x-auto">
        <table className="min-w-full md:table md:w-full md:table-fixed border-collapse bg-white m-0 p-0">
          <thead>
            <tr className="border-b border-b-slate-200 p-3 text-left">
              <th className="p-3 text-slate-400 font-semibold text-sm">Date</th>
              <th className="p-3 text-slate-400 font-semibold text-sm">
                Energy
              </th>
              <th className="p-3 text-slate-400 font-semibold text-sm">Cost</th>
              <th className="p-3 text-slate-400 font-semibold text-sm">
                State
              </th>
              <th className="p-3 text-slate-400 font-semibold text-sm text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-b-slate-200">
                <td className="p-4 text-black text-sm font-semibold">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="p-4 text-black text-sm font-semibold">
                  {item.kwh} kWh
                </td>
                <td className="p-4 text-black text-sm font-semibold">
                  ₦{item.cost}
                </td>
                <td className="p-4 text-black text-sm font-semibold">
                  {item.states}
                </td>
                <td className="p-4">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation dialog — outside the table */}
      {confirmDeleteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm mx-4">
            <h1 className="text-xl font-semibold">Delete Reading?</h1>
            <p className="mt-2 text-slate-500">
              Are you sure you want to delete this reading?
            </p>
            <div className="flex justify-end gap-3 mt-5">
              <Button
                className="hover:underline"
                onClick={() => setConfirmDeleteItem(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-400 p-2 rounded-xl text-white"
                onClick={() => handleDelete(confirmDeleteItem)}
                disabled={disableDeleteButton === confirmDeleteItem}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingsTable;
