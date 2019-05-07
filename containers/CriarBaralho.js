import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { saveTitle } from "../utils/api";
import { addDeck } from "../actions";
import BotaoEnvio from "../components/BotaoEnvio";

class CriarBaralho extends Component {
  state = {
    text: ""
  };

  enviarNome = () => {
    const { text } = this.state;

    if (this.state.text) {
      saveTitle(text);
      this.props.dispatch(addDeck(text));
      this.props.navigation.navigate("Baralho", { entryId: text });
      this.setState({ text: "" });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Qual o nome do novo baralho?</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <BotaoEnvio style={styles.botao} onPress={this.enviarNome} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titulo: {
    fontSize: 34,
    color: "#292477",
    textAlign: "center"
  },
  input: {
    width: 300,
    height: 50,
    padding: 10,
    borderWidth: 2,
    margin: 25
  },

  botao: {
    borderColor: "#d6d7",
    borderWidth: 1.5,
    padding: 7,
    backgroundColor: "#fff"
  }
});

export default connect()(CriarBaralho);
