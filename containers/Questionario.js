import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { connect } from "react-redux";
import Botao from "../components/Botao";
import { Info } from "../components/Info.js";

class Questionario extends React.Component {
  state = {
    questionNumber: 0,
    showQuestion: false,
    correct: 0,
    incorrect: 0,
    animation: new Animated.Value(0.5),
    rotate: new Animated.Value(0),
    colorChange: new Animated.Value(0)
  };

  exibirResp = () =>
    !this.state.showQuestion
      ? this.setState({ showQuestion: true })
      : this.setState({ showQuestion: false });

  enviarResp = answer => {
    this.handleAnimation();

    const { questionNumber } = this.state;
    const deck = this.props.navigation.state.params.entryId;
    const decks = this.props.decks;
    const correct = decks[deck].questions[
      questionNumber
    ].correctAnswer.toLowerCase();

    if (answer.trim() === correct.trim()) {
      this.setState({ correct: this.state.correct + 1 });
    } else {
      this.setState({ incorrect: this.state.incorrect + 1 });
    }
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      showQuestion: false
    });
  };

  handleAnimation = () => {
    Animated.spring(this.state.animation, {
      toValue: 1.1,
      friction: 2,
      tension: 360,
      duration: 1000
    }).start(() => {
      Animated.spring(this.state.animation, {
        toValue: 1,
        duration: 100
      }).start();
    });

    Animated.timing(this.state.rotate, {
      toValue: 360,
      duration: 1500,
      delay: 1000
    }).start(() => {
      Animated.timing(this.state.rotate, {
        toValue: 0,
        duration: 1000
      }).start();
    });

    Animated.timing(this.state.colorChange, {
      toValue: 1,
      duration: 1500
    }).start(() => {
      Animated.timing(this.state.colorChange, {
        toValue: 0,
        duration: 1500
      }).start();
    });
  };

  repetir = () => {
    this.setState({
      questionNumber: 0,
      showQuestion: false,
      correct: 0,
      incorrect: 0
    });
  };

  voltar = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: null }));
  };

  render() {
    const questionNumber = this.state.questionNumber;
    const decks = this.props.decks;
    const deck = this.props.navigation.state.params.entryId;
    const number = this.state.questionNumber + 1;

    const animatedStyle = {
      transform: [{ scale: this.state.animation }]
    };

    const rotateInterpolate = this.state.rotate.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "1080deg"]
    });

    const rotateStyles = {
      transform: [
        {
          rotate: rotateInterpolate
        }
      ]
    };

    const boxInterpolation = this.state.colorChange.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(242, 111, 40, 1)", "rgba(185, 63, 179, 1)"]
    });

    const boxAnimation = {
      backgroundColor: boxInterpolation
    };

    if (questionNumber === decks[deck].questions.length) {
      return (
        <View style={styles.container}>
          <Animated.View style={[styles.cartao, boxAnimation]}>
            <Animated.View style={animatedStyle}>
              <Text style={styles.titulo}>
                Você acertou {this.state.correct} de{" "}
                {decks[deck].questions.length} !
              </Text>
            </Animated.View>

            {this.state.correct > this.state.incorrect ? (
              <Animated.View style={rotateStyles}>
                <Text style={{ fontSize: 90 }}>É</Text>
              </Animated.View>
            ) : (
              <Animated.View style={rotateStyles}>
                <Text style={{ fontSize: 90 }}>😭</Text>
              </Animated.View>
            )}

            <View>
              <Botao
                styles={styles}
                text={"Repita"}
                color={"#E54B4B"}
                onPress={this.repetir}
              />
              <Botao
                styles={styles}
                text={"Voltar"}
                color={"#62A87C"}
                onPress={this.voltar}
              />
            </View>
          </Animated.View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.cartao}>
          <Text style={styles.questoes}>
            {number} / {decks[deck].questions.length}
          </Text>

          {!this.state.showQuestion ? (
            <Text style={styles.titulo}>
              {decks[deck].questions[questionNumber].question}
            </Text>
          ) : (
            <Text style={styles.titulo}>
              {decks[deck].questions[questionNumber].answer}
            </Text>
          )}

          {!this.state.showQuestion ? (
            <Info
              style={styles.resposta}
              text={"Ver Resposta"}
              onPress={this.exibirResp}
            />
          ) : (
            <Info
              style={styles.resposta}
              text={"Mostrar Questão"}
              onPress={this.exibirResp}
            />
          )}

          <View>
            <Botao
              color={"#62A87C"}
              styles={styles}
              text={"Correto"}
              onPress={() => this.enviarResp("true")}
            />
            <Botao
              color={"#E54B4B"}
              styles={styles}
              text={"Errado"}
              onPress={() => this.enviarResp("false")}
            />
          </View>
        </View>
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
  iosBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 5,
    width: 160
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 26,
    textAlign: "center"
  },
  questoes: {
    fontSize: 21,
    margin: 7,
    top: 0,
    alignSelf: "flex-start",
    left: 0,
    color: "#fff",
    position: "absolute"
  },
  resposta: {
    color: "#fff",
    fontSize: 21,
    margin: 21
  },
  cartao: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 11,
    borderRadius: 12,
    backgroundColor: "#f26f28",
    alignSelf: "stretch",
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
    color: "#fff",
    marginTop: 40,
    textAlign: "center"
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(Questionario);
