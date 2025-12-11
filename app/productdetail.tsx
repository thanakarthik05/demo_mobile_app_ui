import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

export default function ProductDetail() {
  const { id } = useLocalSearchParams(); // getting id from URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.log("Error loading product:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return <Text style={{ padding: 20 }}>Product not found.</Text>;
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Image
        source={{ uri: product.image }}
        style={{ height: 300, resizeMode: "contain", marginBottom: 20 }}
      />

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        {product.title}
      </Text>

      <Text style={{ fontSize: 18, color: "gray", marginBottom: 10 }}>
        {product.category}
      </Text>

      <Text style={{ fontSize: 20, color: "green", marginBottom: 15 }}>
        ${product.price}
      </Text>

      <Text style={{ fontSize: 16, lineHeight: 22 }}>{product.description}</Text>

      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          padding: 15,
          marginTop: 20,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Add to Cart
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          backgroundColor: "black",
          padding: 12,
          marginTop: 15,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>⬅ Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
