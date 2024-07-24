import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SeasonTabs = ({ seasons, activeSeason, onSeasonPress }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.scrollContainer}
    >
      {seasons.map((season) => (
        <TouchableOpacity
          key={season}
          style={[
            styles.tab,
            activeSeason === season && styles.activeTab
          ]}
          onPress={() => onSeasonPress(season)}
        >
          <Text style={styles.tabText}>Season {season}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
  },
  tab: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default SeasonTabs;