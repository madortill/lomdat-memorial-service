
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { preloadAssets } from "./utils/preloadAssets";

import OpeningPage from "./components/OpeningPage/OpeningPage";
import HomePage from "./components/HomePage/HomePage";

import table from "./assets/img/table.svg";
import plant from "./assets/img/plant.svg";
import bahad11Logo from "./assets/img/bahad11Logo.svg";
import tillLogo from "./assets/img/tillLogo.svg";

function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    preloadAssets().then(() => {
      setAssetsLoaded(true);
    });
  }, []);

  if (!assetsLoaded) {
    return (
      <div className="app-loading">
        <div className="app-loading-spinner" />
        <p>טוענים את הלומדה...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-logos">
        <img src={bahad11Logo} alt="בהד 11" />
        <img src={tillLogo} alt="מדור טיל" />
      </div>

      <img src={plant} alt="" className="app-plant" />
      <img src={table} alt="" className="app-table" />

      <div className="app-content">
        <Routes>
          <Route path="/" element={<OpeningPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
