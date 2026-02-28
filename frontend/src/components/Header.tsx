import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const navLinkClasses = (path: string): string =>
    `block px-4 py-2 text-green-800 hover:text-green-600 ${location.pathname === path
      ? "font-semibold underline underline-offset-4"
      : ""
    }`;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">

        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-semibold text-green-900">
          Brahmyayurved
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-base font-medium">
          <Link to="/" className={navLinkClasses("/")}>
            Home
          </Link>
          <Link to="/products" className={navLinkClasses("/products")}>
            Products
          </Link>
          <Link to="/about" className={navLinkClasses("/about")}>
            About
          </Link>
          <Link to="/testimonials" className={navLinkClasses("/testimonials")}>
            Testimonials
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-green-900 focus:outline-none"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60" : "max-h-0"
          }`}
      >
        <nav className="bg-white border-t shadow-sm flex flex-col text-sm font-medium">
          <Link to="/" className={navLinkClasses("/")} onClick={closeMenu}>
            Home
          </Link>

          <Link
            to="/products"
            className={navLinkClasses("/products")}
            onClick={closeMenu}
          >
            Products
          </Link>

          <Link
            to="/about"
            className={navLinkClasses("/about")}
            onClick={closeMenu}
          >
            About
          </Link>

          <Link
            to="/testimonials"
            className={navLinkClasses("/testimonials")}
            onClick={closeMenu}
          >
            Testimonials
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;