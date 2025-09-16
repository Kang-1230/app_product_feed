import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { ProductItem } from "@/type/productItem";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

const Index = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
};

export default Index;
