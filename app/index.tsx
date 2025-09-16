<<<<<<< HEAD
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
=======
import { Text, View } from "react-native";

const index = () => {
  return (
    <View>
      <Text>index</Text>
>>>>>>> b882be43431daaf0121441b2e4428564f774726a
    </View>
  );
};

<<<<<<< HEAD
export default Index;
=======
export default index;
>>>>>>> b882be43431daaf0121441b2e4428564f774726a
