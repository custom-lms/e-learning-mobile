import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const BannerSection = ({
  backgroundImage,
  title,
  subtitle,
  description,
  onPress,
  showButton = true,
  buttonText = 'START LEARNING NOW',
}) => {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}

        {showButton && (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <FontAwesome name="graduation-cap" size={16} color="#000" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4fff7b',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default BannerSection;
