import { Link, useNavigate } from "react-router-dom"; // Để điều hướng người dùng
import { useCart } from "src/contexts/cart"; // Giữ nguyên import này nếu cần

const menus = [
  {
    label: "Trang Chủ",
    link: "/",
  },
  {
    label: "Sản Phẩm",
    link: "/shop",
  },
  {
    label: "Giới Thiệu",
    link: "/about",
  },
  {
    label: "Liên Hệ",
    link: "/contact",
  },
];
const Header = () => {
  const { cart } = useCart();
  const navigate = useNavigate(); // Hook để điều hướng người dùng

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login'); 
  };

  const user = localStorage.getItem('user'); 
  const userData = user ? JSON.parse(user) : null;
  const username = userData ? userData.username : '';
  const role = userData ? userData.role : '';

  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-md">
      <div className="flex items-center justify-between h-[82px] px-12">
        <div className="w-1/12 flex justify-start">
          <img
            src="https://theme.hstatic.net/200000549029/1000902525/14/logo.png?v=3329"
            alt="logo"
            className="h-8"
          />
        </div>
        <nav className="flex w-8/12 gap-10 justify-center">
          {menus.map((menu, index) => (
            <Link to={menu.link} key={index} className="text-lg font-semibold">
              {menu.label}
            </Link>
          ))}
        </nav>
        <div className="flex justify-end gap-10 items-center w-3/12">
          {username ? (
            role === 'admin' ? (
              <a href="/admin/product/list" className="">Xin Chào: {username}</a>
            ) : (
              <span className="">Xin Chào: {username}</span>
            )
          ) : (
            <a href="/login">
              <i className="fa-regular fa-user"></i>
            </a>
          )}
          <i className="fa-solid fa-magnifying-glass"></i>
          <i className="fa-regular fa-heart"></i>
          <a href="/cart">
            <div className="relative">
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {cart}
              </span>
            </div>
          </a>
          {username && (
            <button onClick={handleLogout} className="fixed bottom-10 bg-green-400 right-4 border  text-white px-4 py-2 rounded">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
