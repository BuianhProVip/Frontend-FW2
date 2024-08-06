import { FC } from "react";
import { Banner } from "src/types/banner";


type BannerProps = {
  banner: Banner;
};

const BannerComponent: FC<BannerProps> = ({ banner }) => {
  return (
    <div
      className="w-full h-[600px] bg-cover bg-center"
      style={{ backgroundImage: `url('${banner.image}')` }}
    >
    </div>
  );
};
export default BannerComponent;
