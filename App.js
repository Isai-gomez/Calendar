import React, { Component } from "react";
import * as RM from "react-native";
import Mycalendar from "./component/Mycalendar";
import { StyleSheet, Text, View } from "react-native";

export default class App extends Component {
  render() {
    return (
      <RM.View style={styles.container}>
        <Mycalendar></Mycalendar>
      </RM.View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
