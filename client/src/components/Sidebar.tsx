import { Link } from 'react-router-dom';

const menuItems = [
  { text: 'Sản Phẩm', url: '/admin/product/list' },
  { text: 'Danh Mục', url: '/admin/category/list' },
  { text: 'Banner', url: '/admin/banner/list' },
  { text: 'Người dùng', url: '/admin/user/list' },
];

function Menu() {
  return (
    <ul className='bg-green-600 w-[200px]'>
      <a href="/">
        <div className="flex justify-center my-4">
          <img
            src="https://theme.hstatic.net/200000549029/1000902525/14/logo.png?v=3329"
            alt="logo"
            className="h-8"
          />
        </div>
      </a>
      {menuItems.map((item, index) => (
        <li key={item.text} className="hover:bg-gray-700">
          <Link
            to={item.url}
            className="flex items-center p-4 text-white hover:bg-gray-700"
          >
            <svg
              className="w-6 h-6 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {index % 2 === 0 ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4V4z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4V4z" />
              )}
            </svg>
            <span>{item.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Menu;
