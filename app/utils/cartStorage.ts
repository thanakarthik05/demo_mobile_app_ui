import AsyncStorage from "@react-native-async-storage/async-storage";

// 👉 Define and export type here
export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

export const addToCart = async (item: CartItem) => {
  const jsonValue = await AsyncStorage.getItem("CART");
  let cart: CartItem[] = jsonValue ? JSON.parse(jsonValue) : [];

  const index = cart.findIndex((p: CartItem) => p.id === item.id);

  if (index !== -1) {
    cart[index].qty += item.qty;
  } else {
    cart.push(item);
  }

  await AsyncStorage.setItem("CART", JSON.stringify(cart));
};

export const getCartItems = async (): Promise<CartItem[]> => {
  const jsonValue = await AsyncStorage.getItem("CART");
  return jsonValue ? JSON.parse(jsonValue) : [];
};
