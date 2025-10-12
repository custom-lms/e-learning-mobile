// components/Benefits.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Benefits = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Exciting Benefits for you</Text>
      {/* <Image source={require('../assets/money-icon.png')} style={styles.icon} /> */}
      <FontAwesome5 name="money-bill-wave" size={50} color="#b8f3c6" style={styles.icon} />
      <Text style={styles.mainText}>Invite & Earn assured</Text>
      <Text style={styles.amount}>₹200</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    paddingVertical: 30,
    borderRadius: 10,
    margin: 20,
  },
  topText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    tintColor: '#b8f3c6',
  },
  mainText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  amount: {
    color: '#00ff66',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default Benefits;
