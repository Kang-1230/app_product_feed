import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { ProductItem } from "@/type/productItem";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

const Index = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const newProducts = await getProducts();
    const start = page * 10;
    const end = (page + 1) * 10;
    const newData = newProducts.slice(start, end);

    setProducts([...products, ...newData]);
    setPage((prev) => prev + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts().then((allProducts) => {
      const initialData = allProducts.slice(0, 10);
      setProducts(initialData);
    });
  }, []);

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (isLoading ? <ActivityIndicator /> : null)}
      />
    </View>
  );
};

export default Index;
