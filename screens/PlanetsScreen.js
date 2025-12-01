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
import SwipeableItem from "./SwipeableItem";

export default function PlanetsScreen() {
  const [planets, setPlanets] = useState([]);

  // Search modal
  const [searchText, setSearchText] = useState("");
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  // Swipe modal
  const [swipeModalVisible, setSwipeModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then((res) => res.json())
      .then((data) => setPlanets(data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>

      {/* Search Box */}
      <TextInput
        style={styles.input}
        placeholder="Enter search text..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <Button
        title="Submit"
        onPress={() => setSearchModalVisible(true)}
      />

      {/* Search Modal */}
      <Modal visible={searchModalVisible} transparent animationType="slide">
        <View style={styles.modalBox}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18 }}>You entered:</Text>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginVertical: 10 }}>
              {searchText}
            </Text>

            <Button title="Close" onPress={() => setSearchModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Swipe Modal */}
      <Modal visible={swipeModalVisible} transparent animationType="slide">
        <View style={styles.modalBox}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 22 }}>{selectedText}</Text>
            <Button title="Close" onPress={() => setSwipeModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Swipe List */}
      <ScrollView style={{ marginTop: 20 }}>
        {planets.map((p, index) => (
          <SwipeableItem
            key={index}
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

