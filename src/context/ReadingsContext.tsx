import { createContext } from "react";
import type { Reading } from "../type/types";

type ReadingContextType = {
  API_URL: string;

  items: Reading[];
  setItems: React.Dispatch<React.SetStateAction<Reading[]>>;

  modalButton: boolean;
  setModalButton: React.Dispatch<React.SetStateAction<boolean>>;

  editReading: Reading | null;
  setEditReading: React.Dispatch<React.SetStateAction<Reading | null>>;

  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;

  energy: number | "";
  setEnergy: React.Dispatch<React.SetStateAction<number | "">>;

  cost: number | "";
  setCost: React.Dispatch<React.SetStateAction<number | "">>;

  states: string;
  setStates: React.Dispatch<React.SetStateAction<string>>;

  fetchError: string;
  setFetchError: React.Dispatch<React.SetStateAction<string>>;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  handleAddModalClick: () => void;
  handleEditReadings: (item: Reading) => void;
};

export const ReadingContext = createContext<ReadingContextType | null>(null);
