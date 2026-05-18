import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ReadingProvider from "./context/ReadingProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <ReadingProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    ,
  </ReadingProvider>,
);
