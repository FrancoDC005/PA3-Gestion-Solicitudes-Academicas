
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Solicitudes from "./pages/Solicitudes";
import NuevaSolicitud from "./pages/NuevaSolicitud";
import { SolicitudProvider } from "./context/SolicitudContext";

function App() {
  return (
    <SolicitudProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Sidebar />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/solicitudes/nueva" element={<NuevaSolicitud />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SolicitudProvider>
  );
}

export default App;
