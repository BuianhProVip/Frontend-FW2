import React, { useState } from 'react';

const ProductFilter = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFilterPanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="container mx-auto  fixed z-50 top-[90px]">
            <button className='m-4' onClick={toggleFilterPanel}>
                <svg className="w-[28px] h-[28px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2"/>
                </svg>
            </button>

            <div className={`w-full h-full fixed top-0 z-[60] bg-white p-3 ${isOpen ? 'block' : 'hidden '}`}>
                <div className="flex justify-between">
                    <button className='flex gap-x-1' >
                        <svg className="w-[30px] h-[30px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2"/>
                        </svg>
                        <span className='font-semibold '>Lọc Theo </span>
                    </button>
                    <button onClick={toggleFilterPanel} className='text-[24px] font-semibold text-slate-500'>X</button>
                </div>
                <form action="">
                    <div className="flex gap-x-14">
                        <div className="">
                            <h3 className="text-lg font-bold mb-2">Size</h3>
                            <div>
                                <label className="block mb-2">
                                    <input type="radio" name='size' className="mr-2" />
                                    XS
                                </label>
                                <label className="block mb-2">
                                    <input type="radio" name='size' className="mr-2" />
                                    S
                                </label>
                                <label className="block mb-2">
                                    <input type="radio" name='size' className="mr-2" />
                                    M
                                </label>
                                <label className="block mb-2">
                                    <input type="radio" name='size' className="mr-2" />
                                    L
                                </label>
                            </div>
                        </div>
                        <div className="">
                            <h3 className="text-lg font-bold mb-2">Giá sản phẩm</h3>
                            <div className="">
                                Từ<input type="number" className='border w-20' min={1000} placeholder='...'/>
                                Đến<input type="number" className='border w-20'  placeholder='...'/>
                            </div>
                        </div>
                        <div className="">
                            <h3 className="text-lg font-bold mb-2">Sắp xếp theo</h3>
                            <div>
                                <label className="block mb-2">
                                    <input type="radio" name='size' className="mr-2" />
                                    Giá giảm dần
                                </label>
                                <label className="block mb-2">
                                    <input type="radio" name='size' className="mr-2" />
                                    Giá tăng dần
                                </label>
                            </div>
                        </div>
                    </div>
                    <button  type="button" className="fixed right-0 bottom-0 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Lọc</button>
                </form>
            </div>
        </div>
    );
};

export default ProductFilter;
