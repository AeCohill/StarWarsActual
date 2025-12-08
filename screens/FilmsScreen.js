import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import LazyImage from "./LazyImage";

export default function FilmsScreen() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) =>
      setIsConnected(state.isConnected)
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then((res) => res.json())
      .then((data) => {
        setFilms(data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, color: "red", textAlign: "center" }}>
          ⚠ No network connection detected.
        </Text>
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          Please reconnect to the internet to load Star Wars data.
        </Text>
      </View>
    );
  }

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <LazyImage
        style={styles.banner}
        resizeMode="contain"
        source={require("../assets/Star-Wars-Emblema.png")}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter search text..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Submit" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>You entered:</Text>
            <Text style={styles.modalValue}>{searchText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={films}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Episode: {item.episode_id}</Text>
            <Text>Director: {item.director}</Text>
            <Text>Release: {item.release_date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  banner: { width: "100%", height: 150, marginBottom: 10 },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  item: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: { fontSize: 16, marginBottom: 10 },
  modalValue: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
});
