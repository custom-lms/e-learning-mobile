// MyCoursesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Dummy course data (replace later with real API response)
const dummyCourses = [
  {
    id: 1,
    title: 'Class 7 - SEBA Board',
    description: 'Includes all subjects with Assamese medium',
  },
  {
    id: 2,
    title: 'Class 8 - JB Board',
    description: 'Covers full syllabus with video lessons',
  },
  // ❌ To test empty state, just set dummyCourses to []
];

const CourseCard = ({ title, description }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </View>
);

export default function MyCoursesScreen() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setPurchasedCourses(dummyCourses); // change to [] to simulate empty state
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Courses</Text>

      {purchasedCourses.length === 0 ? (
        <Text style={styles.emptyMessage}>Your course list is empty.</Text>
      ) : (
        <FlatList
          data={purchasedCourses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CourseCard title={item.title} description={item.description} />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    marginTop: 40,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
});