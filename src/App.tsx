import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard, Calculator, ExportSales, ClientsSales, Profile, Admin, Login, Price, Milice } from "./pages";
import { AuthProvider } from "./api/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Layout } from "./components/Layout"; // Import du Layout

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route publique */}
          <Route path="/login" element={<Login />} />
          <Route path="/milice" element={<Milice />} />

          {/* Routes protégées avec Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Déclaration des sous-routes */}
            <Route index element={<Dashboard />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="export-sales" element={<ExportSales />} />
            <Route path="clients-sales" element={<ClientsSales />} />
            <Route path="price" element={<Price />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
