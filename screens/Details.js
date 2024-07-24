import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, SectionList, TouchableOpacity } from "react-native";
import { getShowDetails, getShowEpisodes } from "../api/Connect";

import Summary from "./Summary";

const Details = ({ route }) => {
  const { show } = route.params;
  const [showDetails, setShowDetails] = useState(null);
  const [sections, setSections] = useState([]);
  const [expandedEpisodeId, setExpandedEpisodeId] = useState(null);

  useEffect(() => {
    fetchShowDetails();
    fetchShowEpisodes();
  }, []);
  
  const fetchShowDetails = async () => {
    try {
      const data = await getShowDetails(show.id);
      setShowDetails(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchShowEpisodes = async () => {
    try {
      const data = await getShowEpisodes(show.id);
      const groupedData = groupBySeason(data);
      setSections(groupedData);
    } catch (error) {
      console.error(error);
    }
  };

  const groupBySeason = (episodes) => {
    const seasons = episodes.reduce((acc, episode) => {
      const season = acc.find(s => s.title === `Season ${episode.season}`);
      if (season) {
        season.data.push(episode);
      } else {
        acc.push({ title: `Season ${episode.season}`, data: [episode] });
      }
      return acc;
    }, []);
    return seasons;
  };

  const toggleSummary = (id) => {
    setExpandedEpisodeId(expandedEpisodeId === id ? null : id);
  };
  
  const renderEpisode = ({ item }) => (
    <View style={styles.episodeContainer}>
      {item.image && <Image source={{ uri: item.image.medium }} style={styles.episodeImage} />}
      <View style={styles.episodeDetails}>
        <Text style={styles.episodeName}>Episode {item.number}: {item.name}</Text>
        <Text style={styles.episodeAirdate}>Airdate: {item.airdate}</Text>
        {expandedEpisodeId === item.id && (
          <Text style={styles.episodeSummary}>{item.summary ? item.summary.replace(/<[^>]*>/g, '') : 'No summary available'}</Text>
        )}
        <TouchableOpacity onPress={() => toggleSummary(item.id)}>
          <Text style={styles.toggleButton}>
            {expandedEpisodeId === item.id ? 'Hide Summary' : 'Show Summary'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderEpisode}
      renderSectionHeader={({ section }) => (
        <Text style={styles.seasonTitle}>{section.title}</Text>
      )}
      ListHeaderComponent={showDetails && (
        <>
          <Image source={{ uri: showDetails.image.original }} style={styles.image} />
          <Text style={styles.name}>{showDetails.name}</Text>
          <Summary text={showDetails.summary.replace(/<[^>]*>/g, '')} numberOfLines={5} />
        </>
      )}
      contentContainerStyle={styles.container}
    />
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#121212',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#ffffff',
  },
  summary: {
    fontSize: 16,
    marginVertical: 8,
    color: '#b0b0b0',
  },
  seasonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    padding: 4,
    color: '#ffffff',
  },
  episodeContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#1e1e1e',
    marginVertical: 4,
    borderRadius: 8,
    minHeight: 120,
  },
  episodeImage: {
    width: 150,
    height: 100,
    marginRight: 8,
    borderRadius: 10,
  },
  episodeDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  episodeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  episodeAirdate: {
    fontSize: 14,
    color: '#aaaaaa',
  },
  episodeSummary: {
    fontSize: 14,
    marginTop: 4,
    color: '#b0b0b0',
  },
  toggleButton: {
    color: '#686868',
    marginTop: 8,
  },
});
