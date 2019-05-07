import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Constants } from "expo";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { createStore } from "redux";
import { setLocalNotification } from "./utils/helpers";
import Navigation from "./navigations/navigation";

function MyStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <MyStatusBar backgroundColor={"#292477"} barStyle="light-content" />
          <Navigation />
        </View>
      </Provider>
    );
  }
}
