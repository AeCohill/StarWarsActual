import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Modal, Button, StyleSheet } from "react-native";
import SwipeableItem from "../screens/SwipeableItem";

export default function PlanetsScreen() {
  const [planets, setPlanets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then(res => res.json())
      .then(data => setPlanets(data.results))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {planets.map((p, index) => (
          <SwipeableItem
            key={index}
            text={p.name}
            onSwipe={() => {
              setSelectedText(p.name);
              setModalVisible(true);
            }}
          />
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBox}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 20 }}>{selectedText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  modalBox: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    width: "70%",
    alignItems: "center"
  }
});

