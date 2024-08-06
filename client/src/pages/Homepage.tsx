import axios from "axios";
import { useEffect, useState } from "react";
import Banner from "src/components/Banner";
import Loading from "src/components/Loading";
import ProductCard from "src/components/ProductCard";
import { Banner as BannerType } from "src/types/banner";
import { Product } from "src/types/Product";
import Slider from "react-slick";
import Title from "src/components/elements/title";
import ButtonShowAll from "src/components/elements/buttonShowAll";
export default function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [banners, setBanners] = useState<BannerType[]>([]);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3000/products");
      const sortedProducts = [...data].sort((a: Product, b: Product) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setProducts(sortedProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  const getRandomProducts = (products: Product[], count: number): Product[] => {
    let shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const randomProducts = getRandomProducts(products, 4);
  const latestProducts = products.slice(0, 4);


  const getAllBanner = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3000/banner");
      console.log(data);
      setBanners(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
    getAllBanner();
  }, []);

  
  const CustomPrevArrow = () => (<button className="custom-prev-arrow">&#10094; </button>);
  const CustomNextArrow = () => (<button className="custom-next-arrow" >&#10095; </button>);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

   

  return (
    <>
      <Loading isShow={loading} />   
      {banners.length > 0 && (
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <Banner key={index} banner={banner} />
          ))}
        </Slider>
      )}
      <Title title={`HIME'S PRODUCT`}/>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {randomProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <ButtonShowAll href={'/shop'} title={`Xem Thêm`}/>
      <Title title={`HIME'S NEW PRODUCT`}/>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {latestProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <ButtonShowAll href={'/shop'} title={`Xem Thêm`}/>
    </>
  );
}
