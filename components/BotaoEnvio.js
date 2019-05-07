import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function BotaoEnvio({ onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>Enviar</Text>
    </TouchableOpacity>
  );
}
