import Button from "../components/ui/Button";
import { Search, Download, Plus } from "lucide-react";
import AddModal from "../components/readingsInfo/AddModal";
import type { Reading } from "../type/types";
import type { SetStateAction } from "react";

type ReadingsProp = {
  isLoading: boolean;
  children: React.ReactNode;
  isOpen: boolean;
  setErrorMessage: React.Dispatch<SetStateAction<string | null>>;

  handleToggle: () => void;
  setItems: React.Dispatch<React.SetStateAction<Reading[]>>;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Readings = ({
  isLoading,
  children,
  isOpen,
  handleToggle,
  setItems,
  closeModal,
  setErrorMessage,
}: ReadingsProp) => {
  return (
    <>
      <div className="px-5 py-4 lg:px-20 md:py-10 flex flex-col gap-10 overflow-hidden">
        <div className="flex flex-col gap-8 ">
          {/* the head text */}

          <header className="flex flex-col justify-between gap-4 sm:flex-row sm:justify-between md:items-center">
            <div className="flex flex-col md:gap-2">
              <h1 className="font-bold text-3xl md:text-[2.6rem]">Readings</h1>
              <span className="text-xl text-slate-500">
                Manage your daily energy logs.
              </span>
            </div>

            {/* Button container */}
            <div className="flex gap-2 justify-center">
              <Button className="flex justify-center items-center gap-3 border border-button hover:bg-button hover:text-white rounded-lg w-40 h-8 sm:w-22  md:w-30 md:h-10 ">
                <span>
                  <Download size={15} />
                </span>
                <span>Export</span>
              </Button>

              <Button
                onClick={handleToggle}
                className="bg-button hover:bg-green-300 text-white flex justify-center gap-4 md:gap-7 items-center w-45 h-8 sm:w-22 md:w-30 md:h-10 rounded-lg"
              >
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
              className="flex rounded-xl gap-2 p-2 border border-gray-300 focus-within:border-emerald-500 shadow w-70 h-10 sm:w-90 "
            >
              <Search size={30} className="text-gray-300" />
              <input
                autoFocus
                type="text"
                placeholder="Search dates or notes..."
                className="outline-0 flex-1 placeholder:text-gray-4 sm:text-xl "
              />
            </form>
          </section>
        </div>

        {/* content */}
        <section className="overflow-y-auto border border-slate-300 rounded-xl w-full">
          {isLoading ? (
            <p className="text-xl text-center p-10">Loading items...</p>
          ) : (
            <div className="w-full">{children}</div>
          )}
        </section>
      </div>
      {/* Add modal */}
      <div>
        {isOpen && (
          <AddModal
            handleClose={handleToggle}
            setItems={setItems}
            closeModal={closeModal}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </>
  );
};

export default Readings;
