import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { searchMovies } from '../api/Connect';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Footer from './Footer.js';

const Search = ({ route, navigation }) => {
  const { query } = route.params || {};
  const [searchTerm, setSearchTerm] = useState(query || '');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (term) => {
    if (term.trim() !== '') {
      try {
        const data = await searchMovies(term);
        setMovies(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderMovieItem = ({ item }) => {
    const { show } = item;

    const handlePress = () => {
      navigation.navigate('Details', { show });
    };

    return (
      <TouchableOpacity style={styles.movieItem} onPress={handlePress}>
        {show.image && show.image.medium && (
          <Image source={{ uri: show.image.medium }} style={styles.movieImage} />
        )}
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle} numberOfLines={1} ellipsizeMode="tail">{show.name}</Text>
          <Text style={styles.movieSummary} numberOfLines={3} ellipsizeMode="tail">
            {show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No summary available'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a movie..."
        placeholderTextColor="#888"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={() => handleSearch(searchTerm)}
      />
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.show.id.toString()}
      />
      <Footer />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginTop: 20,
  },
  searchInput: {
    height: responsiveHeight(6),
    backgroundColor: '#333',
    borderRadius: 25,
    paddingHorizontal: 15,
    margin: 10,
    color: 'white',
  },
  movieItem: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#444',
    borderRadius: 10,
    overflow: 'hidden',
    height: responsiveHeight(20),
  },
  movieImage: {
    width: responsiveWidth(30),
    height: '100%',
  },
  movieDetails: {
    flex: 1,
    padding: 10,
  },
  movieTitle: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: 'bold',
  },
  movieSummary: {
    fontSize: responsiveFontSize(1.5),
    color: 'white',
    marginTop: 5,
  },
});
