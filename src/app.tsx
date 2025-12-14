import { Route, Routes, Navigate } from "react-router-dom";
import ServiceWorker from "@/pwa/serviceWorker";

import PhoneLogin from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/app" replace />} />
        <Route path="/login" element={<PhoneLogin />} />
        <Route path="/app" element={<Dashboard />} />
      </Routes>
      <ServiceWorker />
    </>
  );
};

export default App;
