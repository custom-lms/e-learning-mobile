// components/Footer.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ready to Transform Your Child's Learning?</Text>
      <Text style={styles.subheading}>
        Join thousands of students who are achieving academic success while developing essential 21st-century skills.
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startText}>See Demo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.requestText}>Request a call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#002e13',
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  startButton: {
    backgroundColor: '#00d16c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  requestButton: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  startText: {
    color: '#fff',
    fontWeight: '600',
  },
  requestText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Footer;
