import React, { Component } from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import CardFlip from "./cardflip";
export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie_details: null,
      movie: [],
      movie_name: null,
      movie_dur: "",
      movie_description: "",
      isFlipped: false,
    };
  }

  fetchMovies = async () => {
    await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          movies {
            id
            Name
            Duration
            Description
          }
        } `,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ movie_details: data.data.movies });
        console.log(this.state.movie_details);
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.fetchMovies();
    console.log(this.state.movie_name);
  }
  render() {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          height: Dimensions.get("window").height / 2,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={true}
          alwaysBounceVertical={false}
        >
          <View style={{ width: Dimensions.get("window").width }}>
            {this.state.movie_details == null
              ? null
              : this.state.movie_details.map((data) => {
                  return (
                    <View style={{ flexDirection: "column" }}>
                      <CardFlip data={data} />
                    </View>
                  );
                })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: { flexDirection: "row", justifyContent: "space-between" },
});
