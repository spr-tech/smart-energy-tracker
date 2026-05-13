import { Zap, X } from "lucide-react";
import Button from "../ui/Button";
import type { Reading } from "../../type/types";
import { useState, type SetStateAction } from "react";
import axios from "axios";

type AddModalProps = {
  handleClose: () => void;
  setItems: React.Dispatch<React.SetStateAction<Reading[]>>;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<SetStateAction<string | null>>;
};

const AddModal = ({
  handleClose,
  setItems,
  closeModal,
  setErrorMessage,
}: AddModalProps) => {
  const [date, setDate] = useState<string>("");
  const [energy, setEnergy] = useState<number | "">("");
  const [cost, setCost] = useState<number | "">("");
  const [states, setStates] = useState<string>("");
  const API_Url =
    "https://6a0371192afe8349b4b5376a.mockapi.io/api/energydata/energydata";

  const addReading = async () => {
    const newReading: Reading = {
      id: crypto.randomUUID(),
      date: date,
      kwh: Number(energy),
      cost: Number(cost),
      states: states,
    };

    try {
      const response = await axios.post(API_Url, newReading);
      setItems((prev) => [response.data, ...prev]);

      setDate("");
      setEnergy("");
      setCost("");
      setStates("");
      closeModal(false);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date.trim() || !energy || !states.trim()) {
      alert("Please fill in the required fields!");
      return;
    }
    try {
      await addReading();
    } catch (err) {
      if (err instanceof Error) return setErrorMessage(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm ">
      <div className="bg-white sm:rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
              <Zap size={20} fill="currentColor" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">New Reading</h2>
          </div>
          <Button
            onClick={handleClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
          >
            <X size={20} />
          </Button>
        </div>

        <form
          className="flex flex-col gap-8 bg-white rounded-lg p-6 focus-within:border-button"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <h1 className="font-semibold text-2xl">Add Reading</h1>
            <p className="text-slate-300">
              Enter your energy consumption details below.
            </p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="date" className="text-left text-xl">
              Date
            </label>
            <input
              type="date"
              id="date"
              className=" outline-button w-full h-10 rounded-lg ring ring-slate-300 p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="energy" className="text-left text-xl">
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
          </div>

          <div>
            <label htmlFor="energy" className="text-left text-xl">
              Cost incurred
            </label>
            <input
              type="number"
              id="energy"
              step={0.1}
              className="outline-button w-full h-10 rounded-lg ring ring-slate-300 p-2"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
            />
          </div>

          <div className=" outline-none flex flex-col">
            <label htmlFor="states" className="text-left text-xl">
              State
            </label>

            <input
              id="states"
              type="text"
              className="outline-button w-full h-10 rounded-lg ring ring-slate-300 p-2"
              value={states}
              onChange={(e) => setStates(e.target.value)}
            />
          </div>

          <div className="text-right">
            <Button variant="sign" type="submit" className="font-semibold">
              Add Readings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
