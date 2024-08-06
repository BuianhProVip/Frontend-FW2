import { FC } from "react";
import { Link } from "react-router-dom";
import { Product } from "src/types/Product";

type ProductCardProps = {
    product: Product;
  };
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
const Card_Light: FC<ProductCardProps> = ({ product }) => {
    
  return (
    <div className="">
        <div
            className="h-[450px] w-[300px] bg-cover bg-center relative overflow-hidden border"
            style={{ backgroundImage: `url('${product.image}')` }} 
        >
            <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
                {product.category?.name || 'N/A'}
            </span>
        </div>
        <Link to={`/product/${product._id}`}><p className='font-mon text-[18px] mt-3 font-thin w-[290px] overflow-clip'>{product.title}</p></Link>
        <p className='font-mon text-[16px] text-red-500 mt-2 font-thin w-[290px] overflow-clip'>{formatCurrency(product.price)}</p>
    </div>
  )
}

export default Card_Light