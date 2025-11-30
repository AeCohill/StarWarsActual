import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

export default function FilmsScreen() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search modal
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Swipe modal
  const [swipeModalVisible, setSwipeModalVisible] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState("");

  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then((res) => res.json())
      .then((data) => {
        setFilms(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderRightActions = () => (
    <View style={styles.swipeAction}>
      <Text style={styles.swipeText}>Release</Text>
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
            <Text style={styles.modalText}>You entered:</Text>
            <Text style={styles.modalValue}>{searchText}</Text>

            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Swipe Modal */}
      <Modal visible={swipeModalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Film selected:</Text>
            <Text style={styles.modalValue}>{selectedFilm}</Text>

            <Button title="Close" onPress={() => setSwipeModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Scrollable Film List */}
      <ScrollView style={{ marginTop: 20 }}>
        {films.map((item) => (
          <Swipeable
            key={item.title}
            renderRightActions={renderRightActions}
            onSwipeableOpen={() => {
              setSelectedFilm(item.title);
              setSwipeModalVisible(true);
            }}
          >
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>Episode: {item.episode_id}</Text>
              <Text>Director: {item.director}</Text>
              <Text>Release: {item.release_date}</Text>
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
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  item: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  title: { fontSize: 18, fontWeight: "bold" },

  swipeAction: {
    backgroundColor: "#ddd",
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
