import { ProductItem } from "@/type/productItem";
import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get<ProductItem[]>(
      "https://raw.githubusercontent.com/Kang-1230/app_product_feed/refs/heads/main/products.json"
    );
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
