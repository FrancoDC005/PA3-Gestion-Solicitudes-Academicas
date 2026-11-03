import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Solicitudes from "./pages/Solicitudes";
import NuevaSolicitud from "./pages/NuevaSolicitud";
import DetalleSolicitud from "./pages/DetalleSolicitud";
import Comparacion from "./pages/Comparacion";
import { SolicitudProvider } from "./context/SolicitudContext";

function App() {
  return (
    <SolicitudProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Sidebar />
          <div className="main-content-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/solicitudes" element={<Solicitudes />} />
              <Route path="/solicitudes/nueva" element={<NuevaSolicitud />} />
              <Route path="/solicitudes/:id" element={<DetalleSolicitud />} />
              <Route path="/comparacion" element={<Comparacion />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </SolicitudProvider>
  );
}

export default App;
