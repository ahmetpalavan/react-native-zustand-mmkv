import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity } from "react-native";

import { View } from "../../components/Themed";
import data from "@/assets/data.json";
import { Ionicons } from "@expo/vector-icons";
import useCartStore from "@/store/cartStore";
import { Product } from "@/store/interfaces";

export default function TabOneScreen() {
  const { addToCart, removeFromCart, cart } = useCartStore();
  const renderItem: ListRenderItem<Product & { quantity?: number }> = ({ item }) => {
    return (
      <View style={styles.cartContainer}>
        <Image source={{ uri: item.image }} style={styles.cartImage} />
        <View style={styles.itemContainer}>
          <Text style={styles.titleContainer}>{item.title}</Text>
          <Text>$ {item.price}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              addToCart(item);
            }}
            style={{ padding: 10 }}
          >
            <Ionicons name="add-circle-outline" size={24} color="black" />
          </TouchableOpacity>

          <Text style={{ padding: 10 }}>{cart.find((product) => product.id === item.id)?.quantity ?? 0}</Text>

          <TouchableOpacity
            onPress={() => {
              removeFromCart(item);
            }}
            style={{ padding: 10 }}
          >
            <Ionicons name="remove-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  cartContainer: {
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  cartImage: {
    width: 50,
    height: 50,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleContainer: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
