import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ReactCardFlip from "react-card-flip";

import { Card } from "react-native-elements";

export default class CardFlip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
    };
  }

  handleClick() {
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  render() {
    var data = this.props.data;
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        <View style={{ backgroundColor: "#ffffff" }}>
          <Card style={{ backgroundColor: "#aaa4a4" }}>
            <Text
              style={{
                fontFamily: "sans-serif",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {data.Name}
            </Text>
            <TouchableOpacity
              style={{ alignItems: "flex-end" }}
              onPress={() => {
                this.handleClick();
              }}
            >
              <Text style={{ color: "#8e8787" }}>See More </Text>
            </TouchableOpacity>
          </Card>
        </View>
        <View>
          <Card>
            <Text
              style={{
                fontFamily: "sans-serif",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {data.Name}
            </Text>
            <Text style={{ color: "#8e8787" }}>{data.Duration}</Text>
            <Text>{data.Description}</Text>
            <TouchableOpacity
              onPress={() => {
                this.handleClick();
              }}
              style={{ alignItems: "flex-end" }}
            >
              <Text style={{ color: "#8e8787" }}>Close</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </ReactCardFlip>
    );
  }
}
