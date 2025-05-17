import { Link, useNavigate } from 'react-router-dom';
import { BiBarChartAlt2, BiBox, BiClipboard, BiMoney, BiLogOut, BiCog, BiKey } from 'react-icons/bi';
import { useState } from 'react';
import logo from '../assets/logo.png';

const SideMenu = () => {
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <BiBarChartAlt2 /> },
    { path: '/products', label: 'Products', icon: <BiBox /> },
    { path: '/inventory', label: 'Inventory', icon: <BiClipboard /> },
    { path: '/sales', label: 'Sales', icon: <BiMoney /> },
  ];

  const handleLogout = () => {
    setIsLoading(true); // Set loading state to true
    localStorage.removeItem('userToken');
    // Simulate a delay to show the loading state
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after logout is complete
      navigate('/login');
    }, 1000); // Adjust the delay as needed
  };

  const handleForgotPassword = () => {
    // Navigate to the forgot password page
    navigate('/forgot-password');
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <aside className="app-sidebar bg-gray-100 text-gray-800 w-70 h-screen fixed top-0 left-0 shadow-md z-50 border-r border-gray-200 font-medium flex flex-col justify-between">
      <div>
        <div className="flex justify-center items-center py-6 mb-8">
          <img src={logo} alt="App Logo" className="w-32 h-auto" />
        </div>

        <nav className="mt-8">
          <ul className="space-y-2">
            {navLinks.map(({ path, label, icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-all hover:scale-105"
                >
                  <span className="text-lg">{icon}</span>
                  <span className="text-sm font-semibold text-gray-900">{label}</span>
                </Link>
              </li>
            ))}
            <li>
              <div className="relative">
                <button
                  onClick={toggleSettings}
                  className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-all hover:scale-105 w-full text-left"
                >
                  <span className="text-lg"><BiCog /></span>
                  <span className="text-sm font-semibold text-gray-900">Settings</span>
                </button>
                {isSettingsOpen && (
                  <div className="ml-8 mt-2 space-y-2">
                    <button
                      onClick={handleForgotPassword}
                      className="flex items-center gap-2 px-4 py-2 text-black hover:text-blue-700"
                    >
                      <BiKey />
                      <span>Forgot Password</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-4 py-2 text-black hover:text-red-700 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <span className="text-sm">Loading...</span>
                        </>
                      ) : (
                        <>
                          <BiLogOut />
                          <span>Logout</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideMenu;
