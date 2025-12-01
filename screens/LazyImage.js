import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";

const placeholder = require("../assets/Star-Wars-Emblema.png");

export default function LazyImage({ style, source, resizeMode = "cover", ...props }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={[style, styles.container]}>
      {/* Placeholder */}
      {!loaded && <Image source={placeholder} style={StyleSheet.absoluteFill} resizeMode="contain" />}

      {/* Actual Image */}
      <Image
        source={source}
        style={[StyleSheet.absoluteFill]}
        resizeMode={resizeMode}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
});
