import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { addToCart } from "./utils/cartStorage";

import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
    console.log("ist working cart page")
  // ✔ Quantity state
  const [qty, setQty] = useState(1);

  // ✔ Popup modal state
  const [visible, setVisible] = useState(false);

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

  // ✔ Add to Cart Function
  // const handleAddToCart = () => {
  //   setVisible(true); // show popup
  // };
  const handleAddToCart = async () => {
    if (!product) return;
    const cartItem = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      qty: qty,
    };

    await addToCart(cartItem);
    setVisible(true);
  };

  const popup_btn=()=>{
    setVisible(false),
    setQty(1),
    router.replace("/(tabs)/cartlist");
  }
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
    <>
      <ScrollView style={{ padding: 20 }}>
        <view>
          <Image
          source={{ uri: product.image }}
          style={{ height: 300, resizeMode: "contain", marginBottom: 20 }}
        />
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              position: "absolute",
              top: 20,
              right: 10,
              zIndex: 10,
              backgroundColor: "#00000030",
              padding: 8,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>✕</Text>
          </TouchableOpacity>

        </view>
        

        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          {product.title}
        </Text>

        <Text style={{ fontSize: 18, color: "gray", marginBottom: 10 }}>
          {product.category}
        </Text>

        <Text style={{ fontSize: 20, color: "green", marginBottom: 15 }}>
          ${product.price}
        </Text>

        <Text style={{ fontSize: 16, lineHeight: 22 }}>
          {product.description}
        </Text>

        {/* -------- Quantity Selector -------- */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            gap: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => qty > 1 && setQty(qty - 1)}
            style={{
              backgroundColor: "#ddd",
              padding: 10,
              borderRadius: 5,
              width: 40,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>−</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{qty}</Text>

          <TouchableOpacity
            onPress={() => setQty(qty + 1)}
            style={{
              backgroundColor: "#ddd",
              padding: 10,
              borderRadius: 5,
              width: 40,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>+</Text>
          </TouchableOpacity>
        </View>

        {/* -------- Add to Cart Button -------- */}
        <TouchableOpacity
          onPress={handleAddToCart}
          style={{
            backgroundColor: "#007AFF",
            padding: 15,
            marginTop: 20,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* -------- Popup Modal -------- */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
      >
        {/* Click Outside to Close */}
        <Pressable
          onPress={() => setVisible(false)}
          // onPress={() => setVisible(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          {/* Click inside popup should not close */}
          <Pressable
            style={{
              width: "75%",
              backgroundColor: "white",
              padding: 25,
              borderRadius: 10,
            }}
            onPress={() => {}}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              🎉 Added Successfully!
            </Text>

            <Text style={{ textAlign: "center", marginBottom: 20 }}>
              {qty} item(s) added to your cart.
            </Text>

            <TouchableOpacity
              onPress={() => popup_btn()}
              style={{
                backgroundColor: "blue",
                padding: 12,
                borderRadius: 8,
              }}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 16 }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
