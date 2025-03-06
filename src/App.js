import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from './Page/Home';
import Valve from './Page/Valve';
import Dashboard from './Page/Dashboard';
function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Home />} />
        <Route path="/valve/:id" element={<Valve />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}
export default App;
