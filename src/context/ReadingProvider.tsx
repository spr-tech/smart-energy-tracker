import { ReadingContext } from "./ReadingsContext";
import type { Reading } from "../type/types";
import { useState } from "react";

const ReadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Reading[]>([]);
  const [fetchError, setFetchError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalButton, setModalButton] = useState<boolean>(false);
  const [editReading, setEditReading] = useState<Reading | null>(null);

  const API_URL =
    "https://6a0371192afe8349b4b5376a.mockapi.io/api/energydata/energydata?limit=100";
  const [date, setDate] = useState<string>("");
  const [energy, setEnergy] = useState<number | "">("");
  const [cost, setCost] = useState<number | "">("");
  const [states, setStates] = useState<string>("");

  const handleShowModal = () => {
    setEditReading(null);

    setDate("");
    setEnergy("");
    setCost("");
    setStates("");

    setModalButton(true);
  };

  const handleEditReadings = (item: Reading) => {
    setEditReading(item);

    setDate(item.date);
    setEnergy(item.kwh);
    setCost(item.cost);
    setStates(item.states);

    setModalButton(true);
  };

  const handleAddModalClick = () => {
    handleShowModal();
  };

  return (
    <ReadingContext.Provider
      value={{
        API_URL,
        date,
        setDate,
        energy,
        setEnergy,
        cost,
        setCost,
        states,
        setStates,

        items,
        setItems,

        fetchError,
        setFetchError,

        isLoading,
        setIsLoading,

        modalButton,
        setModalButton,

        editReading,
        setEditReading,

        handleAddModalClick,
        handleEditReadings,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
};

export default ReadingProvider;
