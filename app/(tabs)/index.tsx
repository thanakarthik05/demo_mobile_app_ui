import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

type CartItem = Product & { quantity: number };

export default function HomeScreen() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'electronics', 'jewelery', "men's clothing", "women's clothing"];

  /* -------------------- FETCH PRODUCTS -------------------- */
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* -------------------- CART LOGIC ------------------- */
  // const addToCart = (product: Product) => {
  //   const existing = cart.find(i => i.id === product.id);
  //   if (existing) {
  //     setCart(
  //       cart.map(item =>
  //         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  //       )
  //     );
  //   } else {
  //     setCart([...cart, { ...product, quantity: 1 }]);
  //   }
  // };

  /* -------------------- NAVIGATE TO DETAIL -------------------- */
  const goToDetail = (id: number) => {
    if (!id) {
      console.log("❌ Cannot navigate, no id found");
      return;
    }

    // navigate with query param
    router.push(`/cartpage?id=${id}`);
    // router.push(`/cart?id=${id}`);
  };

  /* -------------------- FILTER LOGIC -------------------- */
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  /* -------------------- LOADING SCREEN -------------------- */
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading products...</Text>
      </View>
    );
  }

  /* -------------------- UI -------------------- */
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>🛒 SZ Shop</ThemedText>

        <View style={styles.cartBadge}>
          <ThemedText style={styles.cartBadgeText}>Cart: {cart.length}</ThemedText>
        </View>
      </ThemedView>

      <ThemedView style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </ThemedView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ThemedView style={styles.productsGrid}>
  {filteredProducts.map(product => (
    <TouchableOpacity
      key={product.id}
      style={styles.productCard}
      onPress={() => goToDetail(product.id)}
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <ThemedText numberOfLines={2} style={styles.productName}>
        {product.title}
      </ThemedText>

      <ThemedText style={styles.productPrice}>${product.price}</ThemedText>
    </TouchableOpacity>
  ))}
</ThemedView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 28 },
  cartBadge: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cartBadgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  cartBadgeTotal: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  searchContainer: { padding: 20, paddingTop: 0 },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  categoryContainer: { paddingHorizontal: 20, marginBottom: 10 },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonActive: { backgroundColor: '#007AFF' },
  categoryText: { fontSize: 14, color: '#333' },
  categoryTextActive: { color: '#fff', fontWeight: 'bold' },

  productsGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  paddingHorizontal: 10,
},

  productsContainer: { padding: 20 },
  productCard: {
    width: "48%",     
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding:10,
    elevation: 3,
  },
  productImage: { width: '100%', height: 150 },
  productInfo: { padding: 15 },
  productName: { fontSize: 18 },
  productCategory: { fontSize: 12, color: '#666' },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap:10
  },
  productPrice: { fontSize: 15, color: '#007AFF' },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    // width: '40%',
  alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#444',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  cartPreview: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  cartPreviewTitle: { marginBottom: 15 },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cartItemName: { flex: 1 },
  cartItemQuantity: { marginHorizontal: 10, color: '#666' },
  cartItemPrice: { fontWeight: 'bold' },
  cartTotalContainer: { marginTop: 15, borderTopWidth: 2, borderTopColor: '#007AFF' },
  cartTotalText: { fontSize: 18, textAlign: 'right', color: '#007AFF' },
});



    