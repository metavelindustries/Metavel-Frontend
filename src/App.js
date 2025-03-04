import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from './Page/Home';
import Valve from './Page/Valve';
function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valve/:id" element={<Valve />} />
      </Routes>
    </Router>
      <Footer />
    </div>
  );
}
export default App;
