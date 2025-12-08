import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import SwipeableItem from "./SwipeableItem";

export default function PlanetsScreen() {
  const [planets, setPlanets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [swipeModalVisible, setSwipeModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) =>
      setIsConnected(state.isConnected)
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then((res) => res.json())
      .then((data) => setPlanets(data.results))
      .catch(() => {});
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter search text..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Submit" onPress={() => setSearchModalVisible(true)} />

      <Modal visible={searchModalVisible} transparent animationType="slide">
        <View style={styles.modalBox}>
          <View style={styles.modalContent}>
            <Text>You entered:</Text>
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>{searchText}</Text>
            <Button title="Close" onPress={() => setSearchModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={swipeModalVisible} transparent animationType="slide">
        <View style={styles.modalBox}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 20 }}>{selectedText}</Text>
            <Button title="Close" onPress={() => setSwipeModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <ScrollView style={{ marginTop: 20 }}>
        {planets.map((p, i) => (
          <SwipeableItem
            key={i}
            text={p.name}
            onSwipe={() => {
              setSelectedText(p.name);
              setSwipeModalVisible(true);
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  modalBox: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
  },
});
