
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import OpeningPage from "./components/OpeningPage/OpeningPage";
import { preloadAssets } from "./utils/preloadAssets";

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
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/home" element={<div>מסך הבית ייבנה בהמשך</div>} />
      </Routes>
    </div>
  );
}

export default App;
