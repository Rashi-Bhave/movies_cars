import React from "react";
import { View} from "react-native";
import MovieDetails from "./movieDetail";
import CarDetails from "./carDetail";

export default function App() {
  return (
    <View>
      <MovieDetails />
      <CarDetails />
    </View>
  );
}
