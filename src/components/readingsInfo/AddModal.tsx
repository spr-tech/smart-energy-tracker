import { Zap, X } from "lucide-react";
import Button from "../ui/Button";

const AddModal = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
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
          action=""
          className="flex flex-col gap-8 bg-white rounded-lg p-6 focus-within:border-button"
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
            />
          </div>

          <div>
            <label htmlFor="energy" className="text-left text-xl">
              {" "}
              Energy Used (kWh)
            </label>
            <input
              type="number"
              id="energy"
              step={0.1}
              className="outline-button w-full h-10 rounded-lg ring ring-slate-300 p-2"
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
            />
          </div>

          <div className="text-right">
            <Button variant="sign" className="font-semibold">
              Add Readings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
