import { Button, StyleSheet } from "react-native";

import { store } from "@/store/mmkv";
import { useState } from "react";
import { Text, View } from "../components/Themed";
import { useMMKVString } from "react-native-mmkv";

export default function ModalScreen() {
  const [name, setName] = useMMKVString("user.displayName", store);

  const updateName = () => {
    store.set("user.displayName", "John Doe");
  };

  return (
    <View style={styles.container}>
      <Text>Name: {name}</Text>
      <Button title="Update Name" onPress={updateName} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
