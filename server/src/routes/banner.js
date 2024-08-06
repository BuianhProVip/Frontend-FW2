import { Router } from "express";
import BannerController from "../controllers/banner"; 

const bannerRouter = Router();

const bannerController = new BannerController(); 


bannerRouter.get("/", bannerController.getAllBanners); 
bannerRouter.get("/:id", bannerController.getBannerDetail); 
bannerRouter.post("/", bannerController.createBanner); 
bannerRouter.put("/:id", bannerController.updateBanner); 
bannerRouter.delete("/:id", bannerController.deleteBanner);

export default bannerRouter;

