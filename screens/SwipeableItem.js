import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

export default function SwipeableItem({ text, onSwipe }) {
  function handleScroll(event) {
    const offsetX = event.nativeEvent.contentOffset.x;
    if (offsetX >= 200) {
      onSwipe();
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        {/* Actual item */}
        <TouchableOpacity>
          <View style={styles.itemBox}>
            <Text style={styles.itemText}>{text}</Text>
          </View>
        </TouchableOpacity>

        {/* Blank space to swipe into */}
        <View style={styles.blank} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 40,
    marginVertical: 10
  },
  itemBox: {
    width: 200,
    height: 40,
    backgroundColor: "#e9e9e9",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "gray"
  },
  itemText: {
    textAlign: "center",
    fontSize: 18
  },
  blank: {
    width: 200,
    height: 40
  }
});
