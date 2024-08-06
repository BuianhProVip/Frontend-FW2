import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BannerSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Banner = mongoose.model("Banner", BannerSchema);

export default Banner;
