import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import Calculator from './pages/Calculator';
import ClientsSales from './pages/ClientsSales';
import ExportSales from './pages/ExportSales';

function App() {
  return (
      <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/export-sales" element={<ExportSales />} />
              <Route path="/clients-sales" element={<ClientsSales />} />
            </Routes>
          </Layout>
      </Router>
  );
}

export default App;
