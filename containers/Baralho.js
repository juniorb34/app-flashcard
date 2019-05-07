import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import Botao from "../components/Botao";
import { getCardsLength } from "../utils/helpers";

class Baralho extends Component {
  render() {
    const deck = this.props.navigation.state.params.entryId;
    const { decks } = this.props;
    const questions = decks[deck].questions;

    return (
      <View style={styles.container}>
        <View style={styles.cartao}>
          <Text style={styles.titulo}>{decks[deck].title}</Text>
          <Text style={styles.texto}>
            {questions ? getCardsLength(questions) : null}
          </Text>

          <Botao
            styles={styles}
            text={"Adicionar Carta"}
            color={"#292477"}
            onPress={() =>
              this.props.navigation.navigate("CriarCarta", { entryId: deck })
            }
          />
          <Botao
            styles={styles}
            text={"Iniciar Questionário"}
            color={"#E54B4B"}
            onPress={() =>
              this.props.navigation.navigate("Questionario", { entryId: deck })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10
  },
  iosBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 5,
    width: 170
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center"
  },
  cartao: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#cceeff",
    alignSelf: "stretch",
    borderRadius: 9,
    shadowColor: "rgba(0,0,0,0.34)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 4,
    shadowOpacity: 1
  },
  titulo: {
    fontSize: 40,
    color: "#fff"
  },
  texto: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 160
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(Baralho);
