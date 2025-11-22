import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";

export default function PlanetsScreen() {
  const [planets, setPlanets] = useState([]);

  // --- Search State ---
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then(res => res.json())
      .then(data => setPlanets(data.results || []))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>

      {/* --- Search Box --- */}
      <TextInput
        style={styles.input}
        placeholder="Enter search text..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button
        title="Submit"
        onPress={() => setModalVisible(true)}
      />

      {/* --- Modal --- */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>You typed:</Text>
            <Text style={styles.modalValue}>{searchText}</Text>

            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* --- Planet List --- */}
      <FlatList
        data={planets}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name}</Text>
        )}
      />

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

  item: {
    fontSize: 20,
    marginVertical: 10,
  },

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

  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },

  modalValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
