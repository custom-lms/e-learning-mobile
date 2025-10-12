// components/FeatureGrid.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const features = [
  { icon: <FontAwesome name="book" size={28} color="#320064" />, label: "11 Subjects" },
  { icon: <FontAwesome name="video-camera" size={28} color="#320064" />, label: "400+ Videos" },
  { icon: <Entypo name="stopwatch" size={28} color="#320064" />, label: "500+ Hours" },
  { icon: <FontAwesome name="users" size={28} color="#320064" />, label: "12+ Expert Educators" },
  { icon: <FontAwesome name="diamond" size={28} color="#320064" />, label: "Complete Solutions" },
  { icon: <MaterialCommunityIcons name="file-pdf-box" size={28} color="#320064" />, label: "Pdf Materials" },
];

export default function FeatureGrid() {
  return (
    <View style={styles.container}>
      {features.map((item, index) => (
        <View key={index} style={styles.itemBox}>
          {item.icon}
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  itemBox: {
    width: '47%',
    backgroundColor: '#f8f8f8',
    borderRadius: 2,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: '#320064',
    fontWeight: '600',
    textAlign: 'center',
  },
});