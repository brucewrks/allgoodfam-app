import { Route, Routes, Navigate } from "react-router-dom";
import ServiceWorker from "@/pwa/serviceWorker";

import { AppShellProvider } from './components/layout/AppShellContext';
import AppShell from './components/layout/AppShell';

import PhoneLogin from "@/pages/Login";
import Dashboard from "@/pages/Groups";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/app" replace />} />
        <Route path="/login" element={<PhoneLogin />} />

        <Route path="/app/*" element={
          <AppShellProvider>
            <AppShell>
              <Routes>
                <Route path="" element={<Dashboard />} />
              </Routes>
            </AppShell>
          </AppShellProvider>
        } />
      </Routes>

      <ServiceWorker />
    </>
  );
};

export default App;
