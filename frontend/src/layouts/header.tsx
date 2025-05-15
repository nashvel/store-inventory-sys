import { useState } from "react";
import { FiLogOut } from "react-icons/fi"; // Profile Icons

const SimpleHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="app-header sticky flex items-center justify-between px-6 py-3 bg-blue-500 text-white">
      {/* Title */}
      <h1 className="text-xl font-bold">Dashboard</h1>

      {/* Logout Button */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center rounded-full hover:ring-2 hover:ring-white transition-all"
          aria-label="Logout"
        >
          <FiLogOut className="w-6 h-6 text-white" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-lg py-2 z-10 border border-gray-300">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
            >
              <FiLogOut className="w-5 h-5 text-gray-600" />
              <span>Logout</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default SimpleHeader;
