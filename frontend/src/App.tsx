import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Temporary placeholder pages (create these files)
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="bg-[#F4EFE6] text-stone-800 min-h-screen flex flex-col">
        
        <Header />

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/testimonials" element={<Testimonials />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;