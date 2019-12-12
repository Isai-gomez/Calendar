import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class Mycalendar extends Component {
  // propiedasdes del calendario

  months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noveimbre",
    "Diciembre"
  ];
  weekDays = ["D", "L", "M", "M", "J", "V", "S"];
  nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //Estado de la fecha
  state = {
    activeDate: new Date()
  };
  //Metodos del calendario
  changeMonth = n => {
    this.setState(() => {
      this.state.activeDate.setMonth(this.state.activeDate.getMonth() + n);
      return this.state;
    });
  };
  _onPress = item => {
    this.setState(() => {
      if (!item.match && item != -1) {
        this.state.activeDate.setDate(item);
        return this.state;
      }
    });
  };
  // crear los dias como una matriz
  generatMatrix() {
    let matrix = [];
    matrix[0] = this.weekDays;
    const year = this.state.activeDate.getFullYear();
    const month = this.state.activeDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const maxDays = this.nDays[month];
    if (month == 1) {
      // Febrero caso unico
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    let counter = 1;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }
    return matrix;
  }

  render() {
    const matrix = this.generatMatrix();
    let rows = [];
    rows = matrix.map((row, rowIndex) => {
      const rowItems = row.map((item, colIndex) => {
        return (
          <Text
            style={{
              flex: 1,
              height: 18,
              textAlign: "center",
              // Highlight header
              backgroundColor: rowIndex == 0 ? "#ddd" : "#fff",
              // Highlight Sundays
              color: colIndex == 0 ? "#a00" : "#000",
              // Highlight current date
              fontWeight: item == this.state.activeDate.getDate() ? "bold" : ""
            }}
            onPress={() => this._onPress(item)}
          >
            {item != -1 ? item : ""}
          </Text>
        );
      });
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 15,
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          {rowItems}
        </View>
      );
    });

    return (
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center"
          }}
        >
          {this.months[this.state.activeDate.getMonth()]} &nbsp;
          {this.state.activeDate.getFullYear()}
        </Text>
        {rows}
        <Button title="Anterior" onPress={() => this.changeMonth(-1)} />
        <Button title="Siguiente" onPress={() => this.changeMonth(+1)} />
      </View>
    );
  }
}
