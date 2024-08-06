import { FC } from "react";
import { Product } from "src/types/Product";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: Product;
};

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = () => {
    // Get the current cart from localStorage
    const cartStorage = localStorage.getItem("carts") || "[]";
    const carts = JSON.parse(cartStorage);

    // Check if the product is already in the cart
    const existingItemIndex = carts.findIndex((item: any) => item.product._id === product._id);
    
    if (existingItemIndex !== -1) {
      // Product is already in the cart, update the quantity
      carts[existingItemIndex].quantity += 1;
    } else {
      // Product is not in the cart, add it
      carts.push({ product, quantity: 1 });
    }

    // Save the updated cart to localStorage
    localStorage.setItem("carts", JSON.stringify(carts));

    // Optionally, you can update some global cart state or notify the user
    console.log('Product added to cart:', product);
  };

  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
      <a href="#">
        <img
          className="h-96 w-full rounded-t-lg object-cover"
          src={product.image}
          alt={product.title}
        />
      </a>
      <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
        {product.category?.name || 'N/A'}
      </span>
      <div className="mt-4 px-5 pb-5">
        <Link to={`/product/${product._id}`}>
          <h5 className="text-2xl font-extralight tracking-tight text-slate-900">
            {product.title}
          </h5>
        </Link>
        <div className="mt-2.5 mb-5 flex items-center">
          <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
            5.0
          </span>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <div className="flex items-center justify-between">
          <p>
            <span className="text-red-500 font-extralight">
              {formatCurrency(product.price)}
            </span>
          </p>
          <button
            onClick={handleAddToCart}
            className="flex items-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Thêm Giỏ Hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;