import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiBarChartAlt2, BiBox, BiClipboard, BiMoney } from 'react-icons/bi'; // Example using react-icons
import logo from '../assets/logo.png';

const SideMenu = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setIsCollapsed(location.pathname === '/pos');
  }, [location.pathname]);

  const toggleSidebar = () => setIsCollapsed(prev => !prev);

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <BiBarChartAlt2 /> },
    { path: '/pos', label: 'Point Of Sale', icon: <BiBox /> },
    { path: '/Productlist', label: 'Products', icon: <BiBox /> },
    { path: '/Inventory', label: 'Inventory', icon: <BiClipboard /> },
    { path: '/Sales', label: 'Sales', icon: <BiMoney /> },
  ];

  return (
    <aside
      className={`app-sidebar bg-gray-800 text-white transition-all duration-300 ${isCollapsed ? 'w-14' : 'w-48'} h-screen fixed top-0 left-0 shadow-lg z-50`}
    >
      {/* Header: Toggle + Logo */} 
      <div className="flex items-center justify-between px-3 py-4">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          className="text-2xl text-gray-400 hover:text-white transition"
        >
          <GiHamburgerMenu />
        </button>
      </div>

      <div className="flex justify-center items-center py-4">
        <img
          src={logo}
          alt="App Logo"
          className={`transition-all duration-300 ${isCollapsed ? 'w-10' : 'w-28'}`}
        />
      </div>

      <nav className="mt-4">
        <ul className="space-y-2">
          {navLinks.map(({ path, label, icon }) => (
            <li key={path}>
              <Link
                to={path}
                className={`flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg text-sm transition-all hover:scale-105 ${
                  location.pathname === path ? 'bg-gray-700' : ''
                }`}
              >
                <span className="text-lg">{icon}</span>
                {!isCollapsed && <span>{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
