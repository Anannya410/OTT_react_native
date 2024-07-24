import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const EpisodesList = ({ episodes }) => {
  return (
    <View style={styles.listContainer}>
      {episodes.map((item) => (
        <View key={item.id} style={styles.episodeContainer}>
          <Image 
            source={item.image ? { uri: item.image.medium } : require('../assets/episode.png')} 
            style={styles.episodeImage} 
          />
          <View style={styles.episodeDetails}>
            <Text style={styles.episodeName}>Episode {item.number}: {item.name}</Text>
            <Text style={styles.episodeAirdate}>Airdate: {item.airdate}</Text>
            <Text style={styles.episodeSummary}>{item.summary ? item.summary.replace(/<[^>]*>/g, '') : 'No summary available'}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 8,
  },
  episodeContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#1e1e1e',
    marginVertical: 4,
    borderRadius: 8,
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
});

export default EpisodesList;
