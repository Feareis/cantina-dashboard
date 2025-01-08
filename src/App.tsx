import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard, Stats, Calculator, ExportSales, ClientsSales, Profile, Admin } from "./pages";

function App() {
  return (
      <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/export-sales" element={<ExportSales />} />
              <Route path="/clients-sales" element={<ClientsSales />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Layout>
      </Router>
  );
}

export default App;
