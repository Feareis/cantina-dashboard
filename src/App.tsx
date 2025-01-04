import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import pages from "./pages";

function App() {
  return (
      <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<pages.Dashboard />} />
              <Route path="/calculator" element={<pages.Calculator />} />
              <Route path="/export-sales" element={<pages.ExportSales />} />
              <Route path="/clients-sales" element={<pages.ClientsSales />} />
              <Route path="/profile" element={<pages.Profile />} />
              <Route path="/admin" element={<pages.Admin />} />
            </Routes>
          </Layout>
      </Router>
  );
}

export default App;
