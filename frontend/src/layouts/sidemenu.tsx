import { Link, useNavigate } from 'react-router-dom';
import { BiBarChartAlt2, BiBox, BiClipboard, BiMoney, BiCart, BiUser, BiLogOut } from 'react-icons/bi';
import logo from '../assets/logo.png';

const SideMenu = () => {
  const navigate = useNavigate();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <BiBarChartAlt2 /> },
    { path: '/pos', label: 'Products', icon: <BiBox /> },
    { path: '/Productlist', label: 'Inventory', icon: <BiClipboard /> },
    { path: '/Sales', label: 'Sales', icon: <BiMoney /> },
  ];

  const handleCartClick = () => {
    navigate('/cart');  
  };

  const handleProfileClick = () => {
    navigate('/profile');  
  };

  const handleLogout = () => {

    localStorage.removeItem('userToken');
    navigate('/login');  
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
          </ul>
        </nav>
      </div>


      <div className="flex justify-around items-center py-4 border-t border-gray-300">
        <button
          title="Cart"
          className="text-xl text-gray-700 hover:text-green-600"
          onClick={handleCartClick}
        >
          <BiCart />
        </button>
        <button
          title="Profile"
          className="text-xl text-gray-700 hover:text-blue-600"
          onClick={handleProfileClick}
        >
          <BiUser />
        </button>
        <button
          title="Logout"
          className="text-xl text-gray-700 hover:text-red-500"
          onClick={handleLogout}
        >
          <BiLogOut />
        </button>
      </div>
    </aside>
  );
};

export default SideMenu;
