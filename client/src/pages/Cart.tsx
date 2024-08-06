import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartItem } from "src/types/Product";
import { toast } from "react-toastify";

const labels = ["Ảnh", "Tên","Giá",  "Số Lượng", "Tổng", ""];

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

function Cart() {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [isPay, setPay] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
  });
  
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const getCartsFromLocalStorage = () => {
      const cartStorage = localStorage.getItem("carts");
      if (cartStorage) {
        setCarts(JSON.parse(cartStorage));
      }
    };

    getCartsFromLocalStorage();
  }, []);

  const handleRemoveItem = (productId: string) => {
    const updatedCarts = carts.filter(item => item.product._id !== productId);
    setCarts(updatedCarts);
    localStorage.setItem("carts", JSON.stringify(updatedCarts));
  };

  const togglePay = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPay(!isPay);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };  

  const validateForm = () => {
    const errors: string[] = [];
    if (!formData.fullName) errors.push('Tên đầy đủ là bắt buộc.');
    if (!formData.address) errors.push('Địa chỉ là bắt buộc.');
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) errors.push('Số điện thoại không hợp lệ.');
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.push('Email không hợp lệ.');
    setErrors(errors);
    return errors.length === 0;
  };
  

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Dữ liệu đơn hàng:', formData);
      setFormData({
        fullName: '',
        address: '',
        phoneNumber: '',
        email: '',
      });
      localStorage.removeItem("carts");
      toast.success("Thanh toán thành công!")
      window.location.reload();
      setErrors([]);
      togglePay(e);
    }
  };

  const handleClearAll = () => {
    setCarts([]);
    localStorage.removeItem("carts");
  };

  return (
    <>
      {/* Thanh toán modal */}
      <div className={`${isPay ? 'block' : 'hidden'} bg-black bg-opacity-60 w-full h-full fixed top-0 z-50`}>
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
          <button onClick={togglePay} className="absolute text-[22px] font-semibold top-2 right-2 text-slate-500">X</button>
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Thanh toán</h2>

              <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
              <form onSubmit={handleFormSubmit} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
                  <div className="mb-6 grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Tên đầy đủ</label>
                      <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                    </div>

                    <div>
                      <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                      <input type="text" id="address" value={formData.address} onChange={handleInputChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="123 Đường ABC, TP. HCM" required />
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                      <input type="text" id="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="0123456789" required />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="example@example.com" required />
                    </div>
                  </div>

                  {errors.length > 0 && (
                    <div className="mb-4 text-red-500">
                      {errors.map((error, index) => <p key={index}>{error}</p>)}
                    </div>
                  )}

                  <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Thanh toán ngay</button>
                </form>


                {/* Tóm tắt thanh toán */}
                <div className="mt-6 grow sm:mt-8 lg:mt-0">
                  <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tổng tiền sản phẩm:</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">{formatCurrency(carts.reduce((total, item) => total + (item.product.price * item.quantity), 0))}</dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Khuyến mãi:</dt>
                        <dd className="text-base font-medium text-green-500">0 VND</dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Ship:</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">0 VND</dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Thuế:</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">0 VND</dd>
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">Tổng cộng</dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">{formatCurrency(carts.reduce((total, item) => total + (item.product.price * item.quantity), 0) - 0 + 0 + 0)}</dd>
                    </dl>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-8">
                    <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="PayPal" />
                    <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="PayPal Dark" />
                    <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="Visa" />
                    <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="Visa Dark" />
                    <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="MasterCard" />
                    <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="MasterCard Dark" />
                  </div>
                </div>
              </div>

              <p className="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
                Chỗ này  <a href="#" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">chưa được</a> cho<a href="#" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">viết</a> gì
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Giỏ hàng */}
      <div className="container mx-auto px-4 py-8">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="border-b bg-gray-100">
              {labels.map((label, index) => (
                <th key={index} className="p-4 text-left font-semibold text-gray-700">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {carts.length > 0 ? (
              carts.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4 flex items-center gap-4">
                    <img src={item.product.image} alt={item.product.title} className="w-16 h-16 object-cover" />
                  </td>
                  <td><span className="font-medium">{item.product.title}</span></td>
                  <td className="p-4">{formatCurrency(item.product.price)}</td>
                  <td className="p-4 text-center">{item.quantity}</td>
                  <td className="p-4">{formatCurrency(item.product.price * item.quantity)}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="text-red-500 hover:text-red-700 transition duration-150"
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={labels.length} className="p-4 text-center text-gray-500">Giỏ hàng của bạn đang trống.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="w-full flex justify-end mt-2">
          <button onClick={handleClearAll} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Xóa tất cả</button>
          <button type="button" onClick={togglePay} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Thanh toán</button>
        </div>
      </div>
    </>
  );
}

export default Cart;
