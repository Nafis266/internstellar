import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import ISSTracker from "./pages/issTracker";
import SkyMap from "./pages/skyMap";
import Events from "./pages/events";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issTracker" element={<ISSTracker />} />
        <Route path="/skymap" element={<SkyMap />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;