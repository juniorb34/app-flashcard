import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import Baralhos from "../containers/Baralhos";
import Baralho from "../containers/Baralho";
import CriarCarta from "../containers/CriarCarta";
import Questionario from "../containers/Questionario";
import CriarBaralho from "../containers/CriarBaralho";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator(
  {
    Baralhos: {
      screen: Baralhos,
      navigationOptions: {
        tabBarLabel: "Baralhos",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="animation-outline"
            size={34}
            color={tintColor}
          />
        )
      }
    },
    CriarBaralho: {
      screen: CriarBaralho,
      navigationOptions: {
        tabBarLabel: "Adicionar Baralho",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="plus-box-outline"
            size={34}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#292477",
      style: {
        height: 58,
        backgroundColor: "#fff"
      }
    }
  }
);

const AppNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    },
    Baralho: {
      screen: Baralho,
      navigationOptions: {
        title: "Info",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#292477"
        }
      }
    },
    CriarCarta: {
      screen: CriarCarta,
      navigationOptions: {
        title: "Adicionar Carta",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#292477"
        }
      }
    },
    Questionario: {
      screen: Questionario,
      navigationOptions: {
        title: "Questionário",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#292477"
        }
      }
    }
  }
});

export default createAppContainer(AppNavigator);
