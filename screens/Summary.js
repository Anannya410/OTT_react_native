import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const Summary = ({ text, numberOfLines }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <Text
        style={styles.text}
        numberOfLines={isExpanded ? undefined : numberOfLines}
      >
        {text}
      </Text>
      {text.length > numberOfLines * 30 && (  
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={styles.moreLess}>
            {isExpanded ? 'Less' : 'More'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginVertical: 8,
    paddingHorizontal: 2,
    textAlign: 'justify',
    color: '#b0b0b0',
  },
  moreLess: {
    color: '#686868',
    marginVertical: 8,
    paddingHorizontal: 2,
  },
});

export default Summary;
