import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getMoviesByPage } from "../api/Connect.js";

const Categories = () => {
  const [dramaMovies, setDramaMovies] = useState([]);
  const [sciFiMovies, setSciFiMovies] = useState([]);
  const [thrillerMovies, setThrillerMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await getMoviesByPage(0);
      categorizeMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  const categorizeMovies = (movies) => {
    const drama = movies.filter((movie) => movie.genres.includes("Drama"));
    const sciFi = movies.filter((movie) =>
      movie.genres.includes("Science-Fiction")
    );
    const thriller = movies.filter((movie) =>
      movie.genres.includes("Thriller")
    );
    const comedy = movies.filter((movie) => movie.genres.includes("Comedy"));

    setDramaMovies(drama);
    setSciFiMovies(sciFi);
    setThrillerMovies(thriller);
    setComedyMovies(comedy);
  };

  const renderMovieItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.movieItem}
        onPress={() => navigation.navigate("Details", { show: item})}
      >
        {item.image && item.image.medium && (
          <Image
            source={{ uri: item.image.medium }}
            style={styles.movieImage}
          />
        )}
        <Text style={styles.movieTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.genreTitle}>Drama</Text>
        <FlatList
          data={dramaMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />

        <Text style={styles.genreTitle}>Science-Fiction</Text>
        <FlatList
          data={sciFiMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />

        <Text style={styles.genreTitle}>Thriller</Text>
        <FlatList
          data={thrillerMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />

        <Text style={styles.genreTitle}>Comedy</Text>
        <FlatList
          data={comedyMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#000",
  },
  genreTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
    paddingLeft: 10,
  },
  movieItem: {
    alignItems: "center",
    marginRight: 10,
  },
  movieImage: {
    width: 170,
    height: 250,
    marginBottom: 10,
    borderRadius: 5,
  },
  movieTitle: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default Categories;
