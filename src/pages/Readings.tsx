import Button from "../components/ui/Button";
import { Search, Download, Plus } from "lucide-react";
import AddModal from "../components/readingsInfo/AddModal";
import type { Reading } from "../type/types";
import ReadingsTable from "../components/readingsInfo/ReadingsTable";
import type { SetStateAction } from "react";
import { useState } from "react";
import axios from "axios";

type ReadingsProp = {
  items: Reading[];
  isLoading: boolean;
  modalButton: boolean;
  setErrorMessage: React.Dispatch<SetStateAction<string | null>>;

  handleToggle: () => void;
  setItems: React.Dispatch<React.SetStateAction<Reading[]>>;
  setModalButton: React.Dispatch<React.SetStateAction<boolean>>;
  apiurl: string;
};

const Readings = ({
  items,
  isLoading,
  modalButton,
  handleToggle,
  setItems,
  setModalButton,
  setErrorMessage,
  apiurl,
}: ReadingsProp) => {
  const [date, setDate] = useState<string>("");
  const [energy, setEnergy] = useState<number | "">("");
  const [cost, setCost] = useState<number | "">("");
  const [states, setStates] = useState<string>("");
  const [editingItem, setEditingItem] = useState<Reading | null>(null);

  const handleEditClick = (item: Reading) => {
    setEditingItem(item);

    // Prefill form inputs
    setDate(item.date);
    setEnergy(item.kwh);
    setCost(item.cost);
    setStates(item.states);

    setModalButton(true);
  };

 

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateExistingReadings();
  };

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
              onSubmit={handleSubmit}
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
            <div className="w-full">
              <ReadingsTable
                items={items}
                apiurl={apiurl}
                setItems={setItems}
                setErrorMessage={setErrorMessage}
                handleEdit={handleEditClick}
              />
            </div>
          )}
        </section>
      </div>
      {/* Add modal */}
      <div>
        {modalButton && (
          <AddModal
            apiurl={apiurl}
            handleClose={handleToggle}
            setItems={setItems}
            closeModal={setModalButton}
            setErrorMessage={setErrorMessage}
            date={date}
            energy={energy}
            cost={cost}
            states={states}
            setDate={setDate}
            setEnergy={setEnergy}
            setCost={setCost}
            setStates={setStates}
          />
        )}
      </div>
    </>
  );
};

export default Readings;
