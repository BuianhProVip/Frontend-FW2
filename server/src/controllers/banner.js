import { StatusCodes } from "http-status-codes";
import Banner from "../models/BannerModel"; 
import ApiError from "../utils/ApiError";

class BannerController {
  // Lấy tất cả các banner
  async getAllBanners(req, res, next) {
    try {
      const banners = await Banner.find(); 
      res.status(StatusCodes.OK).json(banners);
    } catch (error) {
      next(error);
    }
  }

  // Lấy chi tiết của một banner
  async getBannerDetail(req, res, next) {
    try {
      const banner = await Banner.findById(req.params.id);

      if (!banner) throw new ApiError(404, "Banner Not Found");
      res.status(StatusCodes.OK).json(banner);
    } catch (error) {
      next(error);
    }
  }

  // Tạo một banner mới
  async createBanner(req, res, next) {
    try {
      const newBanner = await Banner.create(req.body);
      res.status(StatusCodes.CREATED).json({
        message: "Create Banner Successful",
        data: newBanner,
      });
    } catch (error) {
      next(error);
    }
  }

  // Cập nhật một banner
  async updateBanner(req, res, next) {
    try {
      const updatedBanner = await Banner.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedBanner) throw new ApiError(404, "Banner Not Found");

      res.status(StatusCodes.OK).json({
        message: "Update Banner Successful",
        data: updatedBanner,
      });
    } catch (error) {
      next(error);
    }
  }

  // Xóa một banner
  async deleteBanner(req, res, next) {
    try {
      const banner = await Banner.findByIdAndDelete(req.params.id);
      if (!banner) throw new ApiError(404, "Banner Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Banner Successful",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BannerController;
