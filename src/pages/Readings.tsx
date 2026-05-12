import Button from "../components/ui/Button";
import { Search, Download, Plus } from "lucide-react";
import type { Reading } from "../type/types";
import ReadingsTable from "../components/readingsInfo/ReadingsTable";
import AddModal from "../components/readingsInfo/AddModal";

type ReadingsProp = {
  items: Reading[];
  isLoading: boolean;
};

const Readings = ({ items, isLoading }: ReadingsProp) => {
  return (
    <>
      <div className="px-5 py-4 md:px-26 md:py-10 flex flex-col gap-10 overflow-hidden">
        <div className="flex flex-col gap-8 ">
          {/* the head text */}

          <header className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <div className="flex flex-col md:gap-2">
              <h1 className="font-bold text-3xl md:text-[2.6rem]">Readings</h1>
              <span className="text-xl text-slate-500">
                Manage your daily energy logs.
              </span>
            </div>

            {/* Button container */}
            <div className="flex gap-2 justify-center">
              <Button className="bg-mauve-300 rounded-lg w-40 h-8 md:w-30 md:h-10 flex justify-center items-center gap-3">
                <span>
                  <Download size={15} />
                </span>
                <span>Export</span>
              </Button>

              <Button className="bg-button text-white flex justify-center gap-4 md:gap-7 items-center w-45 h-8  md:w-30 md:h-10 rounded-lg">
                <span className="text-xl">
                  <Plus size={15} />
                </span>
                <span className=" md:text-xl">Add</span>
              </Button>
            </div>
          </header>

          {/* search item */}
          <section className="md:w-120">
            <form
              action=""
              className="flex rounded-xl gap-2 p-2 border border-gray-300 focus-within:border-emerald-500 shadow w-90 "
            >
              <Search size={30} className="text-gray-300" />
              <input
                autoFocus
                type="text"
                placeholder="Search dates or notes..."
                className="outline-0 flex-1 placeholder:text-gray-4 text-xl "
              />
            </form>
          </section>
        </div>

        {/* content */}
        {isLoading && <p className="text-xl text-center">Loading items...</p>}
        <section className="overflow-y-auto border border-slate-300 rounded-xl w-full">
          {!isLoading && <ReadingsTable items={items} />}
        </section>
      </div>

      {/* Add modal */}
      <div>
        <AddModal />
      </div>
    </>
  );
};

export default Readings;
