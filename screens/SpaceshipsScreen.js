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
import NetInfo from "@react-native-community/netinfo";
import LazyImage from "./LazyImage";
import { useNavigation } from "@react-navigation/native";

export default function SpaceshipsScreen() {
  const navigation = useNavigation();

  const [ships, setShips] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [swipeModalVisible, setSwipeModalVisible] = useState(false);
  const [selectedShip, setSelectedShip] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const animatedValues = useRef({}).current;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) =>
      setIsConnected(state.isConnected)
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch("https://swapi.dev/api/starships/")
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || [];
        setShips(results);

        results.forEach((ship) => {
          animatedValues[ship.name] = new Animated.Value(0);
        });

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

  const handleTap = (shipName) => {
    setSelectedShip(shipName);
    setSwipeModalVisible(true);
  };

  const removeShip = (name) => {
    Animated.timing(animatedValues[name], {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShips((prev) => prev.filter((s) => s.name !== name));
    });
  };

  // ⭐⭐⭐ ADDED — SEARCH FILTER (nothing else touched)
  const filteredShips = ships.filter((ship) =>
    ship.name.toLowerCase().includes(searchText.toLowerCase())
  );
  // ⭐⭐⭐ END ADDED

  return (
    <View style={styles.container}>
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
            <Text>You typed:</Text>
            <Text style={styles.modalValue}>{searchText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={swipeModalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text>Ship:</Text>
            <Text style={styles.modalValue}>{selectedShip}</Text>
            <Button title="Close" onPress={() => setSwipeModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <ScrollView style={{ marginTop: 20 }}>
        {/* ⭐⭐⭐ CHANGED TO filteredShips */}
        {filteredShips.map((item) => {
          const animStyle = {
            opacity: animatedValues[item.name],
            transform: [
              {
                translateX: animatedValues[item.name].interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
            ],
          };

          return (
            <Animated.View key={item.name} style={[styles.itemBox, animStyle]}>
              <TouchableOpacity
                onPress={() => handleTap(item.name)}
                onLongPress={() => removeShip(item.name)}
                onResponderMove={(e) => {
                  if (e.nativeEvent.pageX < 50) {
                    navigation.navigate("SpaceshipDetail", { ship: item });
                  }
                }}
                onStartShouldSetResponder={() => true}
              >
                <Text style={styles.item}>{item.name}</Text>

                <LazyImage
                  source={{
                    uri:
                      "https://starwars-visualguide.com/assets/img/starships/" +
                      (item.url.split("/")[5] || "1") +
                      ".jpg",
                  }}
                  style={{ width: "100%", height: 200, marginTop: 10 }}
                />
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  itemBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  item: { fontSize: 18, fontWeight: "bold" },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
  },
});
