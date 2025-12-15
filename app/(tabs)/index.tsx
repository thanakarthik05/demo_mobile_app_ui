import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Pressable
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
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentLimit, setCurrentLimit] = useState<number>(10);

  const { search = "" } = useLocalSearchParams<{ search?: string }>();

  const categories = ['All', 'electronics', 'jewelery', "men's clothing", "women's clothing"];
  const MAX_LIMIT = 30;

  /* -------------------- FETCH PRODUCTS -------------------- */
  const fetchProducts = async (limit: number, category = selectedCategory) => {
    if (limit === 10) setLoading(true);
    else setLoadingMore(true);

    try {
      const url =
        category === 'All'
          ? `https://fakestoreapi.com/products?limit=${limit}`
          : `https://fakestoreapi.com/products/category/${category}`;

      const response = await fetch(url);
      const data = await response.json();
      setProducts(category === 'All' ? data : data.slice(0, limit));
      console.log(`Loaded ${data.length} products for category: ${category}`);
    } catch (error) {
      console.log('API Error:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(10);
  }, []);

  // Refetch products when category changes
  useEffect(() => {
    setCurrentLimit(10);
    fetchProducts(10, selectedCategory);
  }, [selectedCategory]);

  /* -------------------- LOAD MORE ON SCROLL -------------------- */
  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;

    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;

    if (isCloseToBottom && !loadingMore && currentLimit < MAX_LIMIT) {
      const newLimit = Math.min(currentLimit + 10, MAX_LIMIT);
      setCurrentLimit(newLimit);
      fetchProducts(newLimit, selectedCategory);
    }
  };

  /* -------------------- NAVIGATE TO DETAIL -------------------- */
  const goToDetail = (id: number) => {
    if (!id) {
      console.log("❌ Cannot navigate, no id found");
      return;
    }
    router.push(`/(tabs)/cart/cart?id=${id}`);
  };

  /* -------------------- FILTER LOGIC -------------------- */
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  /* -------------------- LOADING SCREEN -------------------- */
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Loading products...</Text>
      </View>
    );
  }

  /* -------------------- UI -------------------- */
  return (
    <ScrollView
      style={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={400}
      keyboardShouldPersistTaps="handled"
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        nestedScrollEnabled={true}
      >
        {categories.map(category => (
          <Pressable
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={({ pressed }) => [
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </Pressable>
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

      {loadingMore && (
        <View style={styles.loadingMoreContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingMoreText}>Loading more products...</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  categoryContainer: { paddingHorizontal: 20, marginBottom: 10 },
  categoryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
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
  productCard: {
    width: "48%",
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
  },
  productImage: { width: '100%', height: 150 },
  productName: { fontSize: 16, marginTop: 5 },
  productPrice: { fontSize: 15, color: '#007AFF', marginTop: 3 },

  loadingMoreContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingMoreText: { marginTop: 10, fontSize: 14, color: '#666' },
});
