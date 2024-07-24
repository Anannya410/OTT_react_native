import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import { getAllMovies } from "../api/Connect";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);
  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const searchBarWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchAllMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (movies.length > 0 && !searchVisible) {
        currentIndex.current = (currentIndex.current + 1) % movies.length;
        flatListRef.current.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
        setCurrentDotIndex(currentIndex.current);
      }
    }, 2000); // 2 seconds interval

    return () => clearInterval(interval);
  }, [movies, searchVisible]);

  const fetchAllMovies = async () => {
    try {
      const data = await getAllMovies();
      const filteredMovies = data.filter(
        (movie) => movie.show.image && movie.show.image.medium
      );
      setMovies(filteredMovies);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchIconPress = () => {
    if (searchVisible) {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        Animated.timing(searchBarWidth, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          setSearchVisible(false);
        });
      }
    } else {
      Animated.timing(searchBarWidth, {
        toValue: responsiveWidth(80),
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setSearchVisible(true);
      });
    }
  };

  const handleSearch = () => {
    setSearchVisible(false);
    navigation.navigate('Search', { query: searchQuery });
  };

  const renderMovieBanner = ({ item }) => {
    const { show } = item;

    const handlePress = () => {
      if (!searchVisible) {
        navigation.navigate("Details", { show });
      }
    };

    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={searchVisible ? 1 : 0.7}>
        <ImageBackground
          style={styles.movieBanner}
          resizeMode="cover"
          source={{ uri: show.image.medium }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.linearContainer}
          >
            {searchVisible && (
              <Animated.View style={[styles.searchBar, { width: searchBarWidth }]}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search for a movie..."
                  placeholderTextColor="#888"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </Animated.View>
            )}
            <TouchableOpacity onPress={handleSearchIconPress} style={styles.searchIcon}>
              <Icon name="search" size={24} color="white" />
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderDots = () => {
    return movies.map((_, index) => {
      const isCurrentIndex = index === currentDotIndex;
      return (
        <View
          key={index}
          style={[isCurrentIndex ? styles.currentDot : styles.dot]}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
  ref={flatListRef}
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  horizontal
  data={movies}
  renderItem={renderMovieBanner}
  keyExtractor={(item) => item.show.id.toString()}
  getItemLayout={(data, index) => (
    { length: responsiveWidth(100), offset: responsiveWidth(100) * index, index }
  )}
  onScrollToIndexFailed={(info) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    });
  }}
/>

      <View style={styles.dotsContainer}>{renderDots()}</View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(80),
    backgroundColor: "black",
    marginBottom: 0,
  },
  movieBanner: {
    width: responsiveWidth(100),
    height: responsiveHeight(70),
    justifyContent: "flex-end",
    opacity: 0.7,
  },
  linearContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 10,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    top: 25,
    right: 10,
  },
  searchBar: {
    height: responsiveHeight(5),
    backgroundColor: "#333",
    borderRadius: 25,
    paddingHorizontal: 10,
    justifyContent: "center",
    overflow: "hidden",
    position: 'absolute',
    top: 20,
    right: 5,
  },
  searchInput: {
    color: "white",
  },
  dotsContainer: {
    height: responsiveHeight(10),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: "white",
    marginHorizontal: 7,
    opacity: 0.2,
  },
  currentDot: {
    width: 10,
    height: 4,
    borderRadius: 7,
    backgroundColor: "white",
    marginHorizontal: 7,
    opacity: 1,
  },
  titles: {
    fontSize: responsiveFontSize(2),
    color: "white",
    padding: 10,
    fontWeight: "500",
  },
  playButton: {
    backgroundColor: "white",
    width: responsiveWidth(28),
    height: responsiveHeight(5.5),
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});