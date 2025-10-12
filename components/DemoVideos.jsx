import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

const DemoVideos = ({ title, description, highlights, videoId }) => {
  return (
    <View style={styles.card}>
        <View style={styles.videoContainer}>
            <WebView
                source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
                style={styles.webview}
                allowsFullscreenVideo
            />
        </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {highlights.map((item, index) => (
        <Text key={index} style={styles.highlight}>
          {item}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
  },
  thumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  playIcon: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginTop: 12,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 8,
  },
  highlight: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    },
   webview: {
    flex: 1,
  }
});

export default DemoVideos;
