import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import OfferedCourses from '../components/OfferedCourses';
import Benefits from '../components/Benefits';
import Footer from '../components/Footer';
import { useFonts } from 'expo-font';
import { SimpleLineIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#00ff7f" />;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>

      <StatusBar barStyle="dark-content" backgroundColor="#000" />

      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <ImageBackground
          source={require('../assets/hero-bg.jpg')}
          style={styles.hero}
          resizeMode="stretch"
        >
          <View style={styles.header}>
            <Image
              source={require('../assets/logo.png')} 
              style={styles.logoImage}
            />

            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.signUpBtn}>
                <Text style={styles.signUpText}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>
              Learn for <Text style={[styles.heroTitle, styles.excellence]}>Excellence</Text>
            </Text>
            <TouchableOpacity style={styles.callBtn}>
              <Text style={styles.callText}>Request a call</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Feature Cards */}
        {/* <View style={styles.allCardContainer}> */}
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Image 
                source={require('../assets/vector-school.png')}
                style={styles.cardIcon}
              />
              <Text style={styles.cardTitle}>School Curriculum</Text>
              <Text style={styles.cardSubtitle}>Class 3 to Class 12</Text>
            </View>
            <View style={styles.card}>
              <SimpleLineIcons name="directions" size={28} color="black" style={{ marginBottom: 10 }} />
              <Text style={styles.cardTitle}>Career Guidance</Text>
              <Text style={styles.cardSubtitle}>Get deeper insights</Text>
            </View>
          </View>

          <View style={styles.bottomCard}>
            <Image 
                  source={require('../assets/vector-personality.png')}
                  style={styles.cardIcon}
            />
            <Text style={styles.cardTitleBottom}>Personality Development</Text>
            <Text style={styles.cardSubtitle}>Elevate yourself to shine brightly and stand out.</Text>
          </View>
        {/* </View> */}

        {/* <ClassList /> */}
        <OfferedCourses />
        {/* <Testimonials /> */}
        <Benefits />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {      
      flex: 1,
      backgroundColor: '#fff',
    },
    hero: {
      height: 300,
      resizeMode: 'contain',
      justifyContent: 'space-between',
    },  
    logoImage: {
      width: 100, 
      height: 30, 
      resizeMode: 'contain',
    }, 
    header: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    logo: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    headerButtons: {
      flexDirection: 'row',
      gap: 10,
    },
    signUpBtn: {
      backgroundColor: '#00ff7f',
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 16,
    },
    signUpText: {
      fontWeight: '500',
      color: '#fff',
    },
    loginBtn: {
      borderWidth: 1,
      borderColor: 'white',
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 16,
    },
    loginText: {
      fontWeight: '500',
      color: '#fff',
    },
    heroTextContainer: {
      paddingHorizontal: 20,
      paddingBottom: 30,
      marginBottom: 20
    },
    heroTitle: {
      fontSize: 32,
      fontFamily: 'Poppins-Bold',
      color: '#fff',
    },
    excellence: {
      fontFamily: 'Poppins-Bold',
      color: '#00ff7f',
    },
    callBtn: {
      marginTop: 15,
      borderColor: '#fff',
      borderWidth: 2,
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignSelf: 'flex-start',
    },
    callText: {
      fontFamily: 'Inter-Bold',
      color: '#fff',
    },
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingVertical: 20,
      backgroundColor: '#fff',
    },
    card: {
      display: 'flex',      
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0CDC6E',
      width: '45%',
      padding: 15,
      borderRadius: 12,
      marginTop: -50,
      zIndex: 1
    },
    cardTitle: {
      fontFamily: 'Poppins-Bold',
      fontSize: 14,
      color: '#000'
    },
    cardTitleBottom: {
      fontFamily: 'Poppins-Bold',
      fontSize: 15,
      color: '#0CDC6E'
    },
    cardSubtitle: {
      textAlign: 'center',
      fontFamily: 'Inter-Bold',
      marginTop: 5,
      fontSize: 12,
      color: '#54A04C',
    },
    bottomCard: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#004300', // dark green
      margin: 15,
      padding: 20,
      borderRadius: 12,
      marginTop: '-10'
    },
    safeArea: {
      flex: 1,
      backgroundColor: '#fff', // for matching app background
    },
    cardIcon: {
      width: 28,
      height: 28,
      marginBottom: 10,
      resizeMode: 'contain',
    },
    // allCardContainer: {
    //   marginTop: '-20'
    // }
  });
  