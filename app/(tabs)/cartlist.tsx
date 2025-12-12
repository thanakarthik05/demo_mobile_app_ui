import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { getCartItems } from "../utils/cartStorage";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};


export default function CartList() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const items = await getCartItems();
    setCart(items);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 15,
          textAlign: "center",
        }}
      >
        🛒 My Cart
      </Text>

      {cart.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 30, fontSize: 16 }}>
          Your cart is empty.
        </Text>
      ) : (
        cart.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              backgroundColor: "#f5f5f5",
              padding: 15,
              borderRadius: 10,
              marginBottom: 15,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: 70,
                height: 70,
                marginRight: 15,
                resizeMode: "contain",
              }}
            />

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.title}
              </Text>

              <Text style={{ color: "green", marginTop: 4 }}>
                ${item.price}
              </Text>

              <Text style={{ marginTop: 4 }}>Qty: {item.qty}</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}
