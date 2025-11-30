import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

export default function SpaceshipsScreen() {
  const [ships, setShips] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [swipeModalVisible, setSwipeModalVisible] = useState(false);
  const [selectedShip, setSelectedShip] = useState("");

  useEffect(() => {
    fetch("https://swapi.dev/api/starships/")
      .then(res => res.json())
      .then(data => setShips(data.results || []))
      .catch(err => console.log(err));
  }, []);

  // swipe action
  const renderRightActions = (shipName) => (
    <View style={styles.swipeAction}>
      <Text style={styles.swipeText}>Swipe Release</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Search Box */}
      <TextInput
        style={styles.input}
        placeholder="Enter search text..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <Button title="Submit" onPress={() => setModalVisible(true)} />

      {/* Search Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>You typed:</Text>
            <Text style={styles.modalValue}>{searchText}</Text>

            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Swipe Modal */}
      <Modal visible={swipeModalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Starship:</Text>
            <Text style={styles.modalValue}>{selectedShip}</Text>

            <Button title="Close" onPress={() => setSwipeModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* ScrollView List */}
      <ScrollView style={{ marginTop: 20 }}>
        {ships.map((item) => (
          <Swipeable
            key={item.name}
            renderRightActions={() => renderRightActions(item.name)}
            onSwipeableOpen={() => {
              setSelectedShip(item.name);
              setSwipeModalVisible(true);
            }}
          >
            <View style={styles.itemBox}>
              <Text style={styles.item}>{item.name}</Text>
            </View>
          </Swipeable>
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

  itemBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  item: {
    fontSize: 20,
  },

  swipeAction: {
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },

  swipeText: {
    fontSize: 16,
    color: "black",
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

  modalText: { fontSize: 16, marginBottom: 10 },

  modalValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
