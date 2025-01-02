import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import Calculator from './pages/Calculator';
import ClientsSales from './pages/ClientsSales';
import ExportSales from './pages/ExportSales';
import AdminPatron from './pages/AdminPatron';
import Test from './pages/test';

function App() {
  return (
      <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/export-sales" element={<ExportSales />} />
              <Route path="/clients-sales" element={<ClientsSales />} />
              <Route path="/admin-patron" element={<AdminPatron />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </Layout>
      </Router>
  );
}

export default App;
