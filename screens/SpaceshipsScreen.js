import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Modal,
  Animated,
  TouchableOpacity,
} from "react-native";

export default function SpaceshipsScreen() {
  const [ships, setShips] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [swipeModalVisible, setSwipeModalVisible] = useState(false);
  const [selectedShip, setSelectedShip] = useState("");

  // Animated values for each ship
  const animatedValues = useRef({}).current;

  useEffect(() => {
    fetch("https://swapi.dev/api/starships/")
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || [];
        setShips(results);

        // Create Animated values for each ship
        results.forEach((ship) => {
          animatedValues[ship.name] = new Animated.Value(0);
        });

        // Animate all items sliding & fading in
        Animated.stagger(
          50,
          results.map((ship) =>
            Animated.timing(animatedValues[ship.name], {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            })
          )
        ).start();
      })
      .catch((err) => console.log(err));
  }, []);

  // Tap → show ship modal
  const handleTap = (shipName) => {
    setSelectedShip(shipName);
    setSwipeModalVisible(true);
  };

  // Long press → remove item
  const removeShip = (name) => {
    Animated.timing(animatedValues[name], {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShips((prev) => prev.filter((s) => s.name !== name));
    });
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
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

      {/* Ship Tap Modal */}
      <Modal visible={swipeModalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Starship:</Text>
            <Text style={styles.modalValue}>{selectedShip}</Text>
            <Button title="Close" onPress={() => setSwipeModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* List */}
      <ScrollView style={{ marginTop: 20 }}>
        {ships.map((item) => {
          const animStyle = {
            opacity: animatedValues[item.name],
            transform: [
              {
                translateX: animatedValues[item.name].interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0], // slide in from left
                }),
              },
            ],
          };

          return (
            <Animated.View key={item.name} style={[styles.itemBox, animStyle]}>
              <TouchableOpacity
                onPress={() => handleTap(item.name)}
                onLongPress={() => removeShip(item.name)}
              >
                <Text style={styles.item}>{item.name}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
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
  item: { fontSize: 20 },
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
