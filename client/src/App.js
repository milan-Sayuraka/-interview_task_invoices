import logo from './logo.svg';
import './App.css';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsDemo from './components/dataTable/dataTable'
import NavBar from './components/navBar/navBar'
import Dashboard from './screens/dashboard/dashboard'
import Invoices from './screens/invoices/invoices'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Suspense fallback={<div className="container">Loading...</div>}>
      <main className="container">
      <Routes>
             <Route path="/" element={<Dashboard />} />
             <Route path="/invoices" element={<Invoices />} />
             {/* <Route path="/update" element={<Update />} /> */}
          </Routes>
      </main>
      </Suspense>
    </div>
  );
}

export default App;
