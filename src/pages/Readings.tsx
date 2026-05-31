import Button from "../components/ui/Button";
import { Search, Download, Plus } from "lucide-react";
import ReadingsTable from "../components/readingsInfo/ReadingsTable";
import { useContext } from "react";
import { ReadingContext } from "../context/ReadingsContext";

const Readings = () => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error("ReadingContext must be used inside Provider");
  }

  const { isLoading, handleAddModalClick } = context;

  return (
    <div className="flex flex-col gap-10 overflow-hidden p-4 sm:p-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-800">Readings</h1>
            <span className="text-sm text-slate-500">
              Manage your daily energy logs.
            </span>
          </div>

          {/* Button container */}
          <div className="flex gap-2">
            <Button className="flex flex-1 sm:flex-none justify-center items-center gap-2 border border-button hover:bg-button hover:text-white rounded-lg px-4 h-10">
              <Download size={15} />
              <span>Export</span>
            </Button>

            <Button
              onClick={handleAddModalClick}
              className="flex flex-1 sm:flex-none justify-center items-center gap-2 bg-button hover:bg-green-300 text-white rounded-lg px-4 h-10"
            >
              <Plus size={15} />
              <span>Add</span>
            </Button>
          </div>
        </header>

        {/* Search */}
        <section className="w-full md:w-120">
          <form
            action=""
            className="flex items-center rounded-xl gap-2 p-2 border border-gray-300 focus-within:border-emerald-500 shadow w-full h-10"
          >
            <Search size={20} className="text-gray-300 shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Search dates or notes..."
              className="outline-0 flex-1 placeholder:text-gray-400 text-sm"
            />
          </form>
        </section>
      </div>

      {/* Content */}
      <section className="overflow-y-auto border border-slate-300 rounded-xl w-full">
        {isLoading ? (
          <p className="text-xl text-center p-10">Loading items...</p>
        ) : (
          <div className="w-full">
            <ReadingsTable />
          </div>
        )}
      </section>
    </div>
  );
};

export default Readings;
