// components/Testimonials.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Parent, Class 9 Student',
    initial: 'P',
    text: '“My daughter improved her math grades from C to A in just 3 months with Edu-1. The tutors are patient and make concepts so clear!”',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Class 7 Student',
    initial: 'R',
    text: '“I never thought coding could be this fun. The projects are cool and my teacher explained everything step by step.”',
  },
  {
    id: 3,
    name: 'Sneha Mehra',
    role: 'Parent, Class 6 Student',
    initial: 'S',
    text: '“Thanks to Edu-1, my son now looks forward to learning every day. His confidence has grown so much.”',
  },
];

const Testimonials = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>What Parents & Students Say</Text>
      <Text style={styles.subheading}>Don't just take our word for it – hear from our community.</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {testimonials.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.quote}>{item.text}</Text>
            <View style={styles.footer}>
              <View style={styles.initialCircle}>
                <Text style={styles.initialText}>{item.initial}</Text>
              </View>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.role}>{item.role}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d00',
    textAlign: 'center',
    marginBottom: 5,
  },
  subheading: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingLeft: 10,
  },
  card: {
    backgroundColor: '#f0ffe0',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    width: 260,
  },
  quote: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  initialCircle: {
    backgroundColor: '#004d00',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    fontWeight: 'bold',
    color: '#004d00',
  },
  role: {
    fontSize: 12,
    color: '#555',
  },
});

export default Testimonials;
