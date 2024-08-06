import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card_Light from 'src/components/Card_Light'
import Navigation from 'src/components/elements/navigation';
import Loading from "src/components/Loading";
import { Product } from 'src/types/Product'
import Filter from 'src/components/elements/filters';
const itemsPerPage = 9;

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(products.length / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Loading isShow={loading} />
      <div className="w-full">
        <Filter/>
        <hr className="border-t border-gray-300 w-[80%] mx-auto mt-10" />
        <div className="mx-auto flex gap-y-10 mt-24 flex-wrap justify-around w-[61%]">
          {currentProducts.map((product, index) => (
            <Card_Light key={index} product={product} />
          ))}
        </div>
        <div className="flex justify-center">
          <Navigation
            currentPage={currentPage}
            totalPages={Math.ceil(products.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}

export default Shop;
