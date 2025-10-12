import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const DemoSection = () => {
  const handlePress = () => {
    Linking.openURL('https://www.youtube.com/watch?v=UW2XiPwRcy4&t=17633s');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MasterClassroom Demo Videos</Text>
      <Text style={styles.subtitle}>
        “Explore how our expert teachers simplify complex topics using animations, visuals, and real-life examples.”
      </Text>

      <TouchableOpacity onPress={handlePress} style={styles.videoContainer}>
        <Image
          source={require('../assets/demo-thumbnail.jpg')} // make sure to save the thumbnail as this file
          style={styles.thumbnail}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>General Science</Text>
      <Text style={styles.sectionDesc}>
        Experience interactive science learning with clear explanations, animations, and topic-wise coverage of Physics,
        Chemistry, and Biology — based on the SEBA syllabus.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#1bbd36',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#fff',
    backgroundColor: '#073d2d',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 20,
    fontSize: 14,
  },
  videoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  thumbnail: {
    width: screenWidth * 0.9,
    height: (screenWidth * 0.9) * 9 / 16, // maintain 16:9 aspect ratio
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c1c3c',
    marginBottom: 10,
  },
  sectionDesc: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
  },
});

export default DemoSection;