import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import LazyImage from "./LazyImage";

export default function SpaceshipDetailScreen({ route }) {
  const { ship } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{ship.name}</Text>

      <LazyImage
        source={{
          uri:
            "https://starwars-visualguide.com/assets/img/starships/" +
            (ship.url.split("/")[5] || "1") +
            ".jpg",
        }}
        style={{ width: "100%", height: 250, borderRadius: 10 }}
        resizeMode="cover"
      />

      <View style={styles.box}>
        <Text style={styles.label}>Model:</Text>
        <Text style={styles.value}>{ship.model}</Text>

        <Text style={styles.label}>Manufacturer:</Text>
        <Text style={styles.value}>{ship.manufacturer}</Text>

        <Text style={styles.label}>Cost:</Text>
        <Text style={styles.value}>{ship.cost_in_credits}</Text>

        <Text style={styles.label}>Length:</Text>
        <Text style={styles.value}>{ship.length}</Text>

        <Text style={styles.label}>Crew:</Text>
        <Text style={styles.value}>{ship.crew}</Text>

        <Text style={styles.label}>Passengers:</Text>
        <Text style={styles.value}>{ship.passengers}</Text>

        <Text style={styles.label}>Hyperdrive Rating:</Text>
        <Text style={styles.value}>{ship.hyperdrive_rating}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  box: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    elevation: 3,
  },
  label: { fontWeight: "bold", fontSize: 16, marginTop: 10 },
  value: { fontSize: 16, marginBottom: 10 },
});
