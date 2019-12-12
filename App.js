import React, { Component } from "react";
import Mycalendar from "./component/Mycalendar";

import { View } from "react-native";

export default class App extends Component {
  render() {
    return (
      <View
        style={{
          paddingTop: 40
        }}
      >
        <Mycalendar />
      </View>
    );
  }
}
