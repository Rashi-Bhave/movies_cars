import React, { Component } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";

import { Card } from "react-native-elements";

import { Picker } from "@react-native-picker/picker";
export default class CarDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car_details: null,
      car_name: "",
      car_price: "",
      car_company: "",
      car_type: "",
    };
  }
  updateState = (car, value) => {
    this.setState({
      car_name: car[value]["Name"],
      car_price: car[value]["Price"],
      car_company: car[value]["Company"],
      car_type: car[value]["Type"],
    });
  };
  fetchCars = async () => {
    await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
                cars {
                  id
                  Company
                  Name
                  Price
                  Type
                }
              }`,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ car_details: data.data.cars });
        console.log(this.state.car_details);
      })
      .catch((error) => console.log(error));
  };
  componentDidMount() {
    this.fetchCars();
  }
  render() {
    var cars = [];
    return (
      <View style={{ marginTop: 20 }}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          alwaysBounceVertical={false}
        >
          <View style={{ alignItems: "center" }}>
            <Picker
              onValueChange={(item, value) => {
                this.updateState(cars, value);
              }}
              style={{ width: Dimensions.get("window").width / 2, height: 30 }}
            >
              {this.state.car_details == null
                ? null
                : this.state.car_details.map((car, index) => {
                    cars.push(car);
                    return (
                      <Picker.Item
                        key={index}
                        label={car.Name}
                        value={car.Name}
                      ></Picker.Item>
                    );
                  })}
            </Picker>
          </View>
          {this.state.car_name == "" ? null : (
            <Card>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {"Name:-" + this.state.car_name}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                {"Company:-" + this.state.car_company}
              </Text>
              <Text>{"Price:-" + this.state.car_price}</Text>
              <Text>{"Type:- " + this.state.car_type}</Text>
            </Card>
          )}
        </ScrollView>
      </View>
    );
  }
}
