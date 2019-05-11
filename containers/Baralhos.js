import React, { Component } from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getDecks } from "../utils/api";
import { receiveDecks } from "../actions";
import { getCardsLength } from "../utils/helpers";

class Baralhos extends Component {
  componentDidMount() {
    getDecks().then(decks => this.props.receiveAllDecks(decks));
  }

  render() {
    const { decks } = this.props;

    return (
      <ScrollView style={styles.container}>
        {Object.keys(decks).map(deck => {
          const { title, questions } = decks[deck];
          return (
            <View key={deck} style={styles.carta}>
              <Text style={styles.textoCarta}>{title}</Text>
              <Text style={styles.textoCarta}>
                {questions ? getCardsLength(questions) : null}
              </Text>

              <Button
                style={styles.botaoCarta}
                onPress={() =>
                  this.props.navigation.navigate("Baralho", { entryId: deck })
                }
                title="Acessar"
              />
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    padding: 5
  },
  carta: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
        margin: 8,
    height: 200,
    backgroundColor: "#cceeff",
    borderRadius: 10,
    shadowColor: "rgba(0,0,0,0.34)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 4,
    shadowOpacity: 1
  },
  textoCarta: {
    fontSize: 32,
    color: "#fff"
  },
  botaoCarta: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveAllDecks: decks => dispatch(receiveDecks(decks))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Baralhos);
