import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../config/config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';


export default function OfferedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();  // Get the navigation prop

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/classes`);
      const data = await response.json();

      console.log("API RESPONSE DATA IS", data)
      setCourses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00dc82" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Master Classroom</Text>
      <Text style={styles.sectionSubtitle}>
        Browse our most sought-after programs.
      </Text>

      {/* Tabs (Optional Static Filters) */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, { backgroundColor: '#f6f8e7' }]}>
          <Text style={styles.tabText}>High School</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, { backgroundColor: '#00dc82' }]}>
          <Text style={[styles.tabText, { color: '#fff' }]}>Higher Secondary</Text>
        </TouchableOpacity>
      </View>

      {/* Course Cards Grid */}
      <View style={styles.grid}>
        {courses.map((course, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.classTitle}>{course.name}</Text>
            <Text style={[styles.price, { marginBottom: 0 }]}>Only ₹2,999</Text>   
            <Text style={styles.price}>for the whole year</Text>         

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ClassDetails', {
                  classId: course.id,
                  className: course.name,
                })
              }
              style={{ width: '80%' }}
            >
              {/* <LinearGradient
                colors={['#00a326', '#4ade80']} // 🌈 dark green → light lime
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              > */}
              <LinearGradient
                // 1. UPDATED: Darker color at the top (top-to-bottom gradient)
                colors={['#006400', '#4ade80']} // 🌈 Very dark green → light lime
                start={{ x: 0.5, y: 0 }} // Top-Center
                end={{ x: 0.5, y: 1 }}   // Bottom-Center
                style={styles.gradientButton}
              >
                <Text style={styles.gradientButtonText}>Program Details</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>

        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2a2a2a',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  tabText: {
    fontWeight: '600',
    fontSize: 14,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // ✅ Clean modern card design (like your image)
  card: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#013a00',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,

    // ✅ Real 3D shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },

  classTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#013a00',
    textAlign: 'center',
    marginBottom: 16,
  },

  price: {
    fontSize: 11,
    color: '#000',
    textAlign: 'center',
    fontWeight: '900',
    marginBottom: 18,
    letterSpacing: -0.5,
  },

  // ✅ “Program Details” button
  typeBadge: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#00a326',
    shadowColor: '#00a326',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  // gradientButton: {
  //   paddingVertical: 10,
  //   borderRadius: 25,
  //   alignItems: 'center',
  //   justifyContent: 'center',

  //   // shadow for 3D look
  //   shadowColor: '#00a326',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 4,
  //   elevation: 4,
  // },

  // gradientButtonText: {
  //   color: '#fff',
  //   fontSize: 14,
  //   fontWeight: '600',
  // },

  gradientButton: {
    // 2. UPDATED: Reduced padding for a smaller button height
    paddingVertical: 4, 
    marginVertical: 4,
    marginTop: 8,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',

    // shadow for 3D look
    shadowColor: '#00a326',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  gradientButtonText: {
    color: '#fff',
    fontSize: 13, 
    fontWeight: '700',
  },

});
