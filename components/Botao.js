import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Botao({ onPress, styles, text, color }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.iosBtn, { backgroundColor: color }]}
    >
      <Text style={styles.botaoTexto}>{text}</Text>
    </TouchableOpacity>
  );
}
