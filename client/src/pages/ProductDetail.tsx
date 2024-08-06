import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartItem, Product } from "src/types/Product";
import Loading from "src/components/Loading";
import { useCart } from "src/contexts/cart";
import Rating from "src/components/elements/rating";

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
function ProductDetail() {
  const { setCart } = useCart();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | undefined>();
  const [quantity, setQuantity] = useState<number>(0);

  const getProduct = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const handleAddToCart = async (product: Product) => {
    if (quantity <= 0) return;
    try {
      await axios.post("/carts", { product, quantity });
    } catch (error) {
      console.error(error);
    }
    const cartStorage = localStorage.getItem("carts") || "[]";
    const carts = JSON.parse(cartStorage);

    const findItem = carts.find(
      (item: CartItem) => item.product._id === product._id
    );
    if (findItem) {
      findItem.quantity += quantity;
    } else {
      carts.push({ product, quantity });
    }
    localStorage.setItem("carts", JSON.stringify(carts));
    setCart(carts.length);
  };

  const [isRate, setRate] = useState(false);
    const toggleRate = (event) => {
        event.preventDefault();
        setRate(!isRate);
        
      };

  return (
    <>
      <Loading isShow={loading} />

      <form action="">
            <div className={`w-full realative ${isRate ? 'block' : 'hidden'}`}>
                <div className="fixed top-0 w-full h-full bg-black z-[100] opacity-40"></div>
                <div className="fixed top-0 z-[101] w-[450px] h-[600px]  bg-white mx-[33%] mt-20 ">
                    <div className="w-full flex justify-end px-3">
                        <button onClick={toggleRate} className='text-[20px] '>X</button>
                    </div>
                    <h2 className='text-[19px] font-bold w-full text-center'>Đánh Giá</h2>
                    <p className='w-full text-center mt-3 text-[14px]'>Bạn cảm thấy sản phẩm này như thế nào?</p>
                    <div className="w-full text-center"><Rating/></div>  
                    <div className="w-full px-8 mt-3">
                        <textarea placeholder='Nhập đánh giá'  className='w-full bg-slate-200 h-[100px] border '/>  
                        <input type="text" name="" id="" className='border w-full h-[40px] px-5 mt-6' placeholder='Họ và tên'/>
                        <div className="flex gap-x-5 mt-6">
                            <input type="text" name="" id="" className='border w-full h-[40px] px-5' placeholder='Số điện thoại'/>
                            <a href=""><input type="text" name="" id="" className='border w-full h-[40px] px-5' placeholder='Email'/></a>
                        </div>
                        <input type="checkbox" name="" id="" className='border mt-6 mr-2'/>Tôi sẽ giới thiệu với bạn bè
                        <div className="w-full text-center mt-12">
                            <button className='w-[200px] h-[50px] bg-black text-white font-bold'>Gửi đánh giá</button>
                        </div>
                    </div>  
                </div>               
            </div>    
        </form>

      <div className="container mx-auto p-4 bg-white rounded-lg mt-10">
        {product && (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
              <p className="text-xl font-semibold text-red-600">{formatCurrency(product.price)}</p>
              <p className="text-lg text-gray-600">Danh mục: {product.category.name}</p>
              <div className="flex items-center gap-4">
                <p className="text-lg font-medium text-gray-700">Số Lượng:</p>
                <button
                  className="p-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200"
                  onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md p-2 w-24 text-center"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button  className="p-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200"
                  onClick={() => setQuantity(quantity + 1)}
                >+
                </button>
              </div>
              
              <p className="text-gray-700">{product.description}</p>
              <div className="flex gap-x-2">
                 <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  onClick={() => handleAddToCart(product)}
                >
                  Thêm Vào Giỏ Hàng
                </button>
                <button className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition' onClick={toggleRate}>GỬI ĐÁNH GIÁ SẢN PHẨM</button>
                <button  className=" hover:bg-blue-700 transition"  >
                  <svg className="w-[48px] h-[48px] text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetail;
