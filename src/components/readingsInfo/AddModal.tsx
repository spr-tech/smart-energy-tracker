import { Zap, X } from "lucide-react";
import Button from "../ui/Button";
import type { Reading } from "../../type/types";
import { useContext, useState } from "react";
import { ReadingContext } from "../../context/ReadingsContext";
import axios from "axios";

const AddModal = () => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error("ReadingContext must be used inside a Provider");
  }

  const {
    API_URL,
    setItems,
    date,
    setDate,
    energy,
    setEnergy,
    cost,
    states,
    setStates,
    editReading,
    setEditReading,
    setModalButton,
    setFetchError,
    setSuccessMessage,
  } = context;

  const [dateError, setDateError] = useState<string | null>(null);
  const [energyError, setEnergyError] = useState<string | null>(null);
  const [statesError, setStatesError] = useState<string | null>(null);

  const addReading = async () => {
    const newReading: Reading = {
      id: crypto.randomUUID(),
      date: date,
      kwh: Number(energy),
      cost: Number(cost),
      states: states,
    };

    try {
      const response = await axios.post(API_URL, newReading);
      const saved = response.data;
      const newItem = {
        id: saved.id,
        date: saved.date,
        kwh: saved.kwh,
        cost: saved.cost,
        states: saved.states,
      };
      setItems((prev) => [newItem, ...prev]);

      setDate("");
      setEnergy("");
      setStates("");
      setModalButton(false);
      setEditReading(null);
      setSuccessMessage("Reading successfully added");
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (err) {
      if (err instanceof Error) {
        setFetchError(err.message);
      }
    }
  };

  const updateReading = async () => {
    try {
      if (!editReading) return;

      const changedReading: Reading = {
        ...editReading,
        date,
        kwh: Number(energy),
        cost: Number(cost),
        states,
      };

      const response = await axios.put(
        `${API_URL}/${editReading.id}`,
        changedReading,
      );
      const saved = response.data;

      const edittedReading = {
        id: saved.id,
        date: saved.date,
        kwh: saved.kwh,
        cost: saved.cost,
        states: saved.states,
      };

      setItems((prev) =>
        prev.map((item) =>
          editReading.id === item.id ? edittedReading : item,
        ),
      );

      setDate("");
      setEnergy("");
      setStates("");
      setModalButton(false);
      setSuccessMessage("Readings succesfully updated");
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (err) {
      if (err instanceof Error) {
        return setFetchError(err.message);
      }
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDateError(null);
    setEnergyError(null);
    setStatesError(null);

    let isValid = true;

    if (!date.trim()) {
      setDateError("Date is required");
      isValid = false;
    }

    if (!energy) {
      setEnergyError("Energy used is required");
      isValid = false;
    }

    if (!states.trim()) {
      setStatesError("State is required");
      isValid = false;
    }

    if (!isValid) return;

    try {
      if (editReading) {
        await updateReading();
      } else {
        await addReading();
      }
    } catch (err) {
      if (err instanceof Error) return setFetchError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white sm:rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
              <Zap size={20} fill="currentColor" />
            </div>
            <h2
              className={
                editReading
                  ? "hidden"
                  : "block text-xl font-bold text-slate-800"
              }
            >
              New Reading
            </h2>
          </div>
          <Button
            onClick={() => setModalButton((prev) => !prev)}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
          >
            <X size={20} />
          </Button>
        </div>

        <form
          className="flex flex-col gap-6 bg-white rounded-lg p-6"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <h1 className="font-semibold text-2xl">
              {editReading ? "Edit Reading" : "Add Reading"}
            </h1>
            <p className="text-slate-500">
              {editReading
                ? "Change your energy consumption details below."
                : "Enter your energy consumption details below."}
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="date"
              className="text-left text-sm font-medium text-slate-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              className="outline-button w-full h-10 rounded-lg ring ring-slate-300 p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <div className="h-4">
              {dateError && (
                <span className="text-red-600 text-sm animate-fade-in">
                  {dateError}
                </span>
              )}
            </div>
          </div>

          {/* Energy */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="energy"
              className="text-left text-sm font-medium text-slate-700"
            >
              Energy Used (kWh)
            </label>
            <input
              type="number"
              id="energy"
              step={0.1}
              className="outline-button w-full h-10 rounded-lg ring ring-slate-300 p-2"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
            />

            <div className="text-slate-400 flex  text-sm">
              <span>Estimated cost : ₦</span>
              <input
                disabled
                type="number"
                id="cost"
                step={0.1}
                className=" "
                value={cost !== null ? Math.round(cost) : ""}
              />
            </div>

            <div className="h-4">
              {energyError && (
                <span className="text-red-600 text-sm animate-fade-in">
                  {energyError}
                </span>
              )}
            </div>
          </div>

          {/* State */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="states"
              className="text-left text-sm font-medium text-slate-700"
            >
              State
            </label>
            <input
              id="states"
              type="text"
              className="outline-button w-full h-10 rounded-lg ring ring-slate-300 p-2"
              value={states}
              onChange={(e) => setStates(e.target.value)}
            />
            <div className="h-4">
              {statesError && (
                <span className="text-red-600 text-sm animate-fade-in">
                  {statesError}
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <Button variant="sign" type="submit" className="font-semibold">
              {editReading ? "Update Reading" : "Add Reading"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
