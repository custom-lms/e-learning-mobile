import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Pressable,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Collapsible from 'react-native-collapsible'; // Optional, else use custom
import { AntDesign } from '@expo/vector-icons'; // or your preferred icon pack
import Banner from '../components/Banner';
import BASE_URL from '../config/config';
import DemoSection from '../components/DemoSection';
import { FontAwesome } from '@expo/vector-icons'; // for graduation cap icon
import FeatureGrid from '../components/FeatureGrid';
import BannerSection from '../components/Banner';
import DemoVideos from '../components/DemoVideos';
  
// Function to convert numbers to Roman numerals
const toRoman = (num) => {
  const romanMap = [
    { val: 10, sym: 'X' },
    { val: 9, sym: 'IX' },
    { val: 8, sym: 'VIII' },
    { val: 7, sym: 'VII' },
    { val: 6, sym: 'VI' },
    { val: 5, sym: 'V' },
    { val: 4, sym: 'IV' },
    { val: 3, sym: 'III' },
    { val: 2, sym: 'II' },
    { val: 1, sym: 'I' },
  ];

  let result = '';
  for (let i = 0; i < romanMap.length; i++) {
    while (num >= romanMap[i].val) {
      result += romanMap[i].sym;
      num -= romanMap[i].val;
    }
  }
  return result;
};


export default function ClassDetails() {

  const route = useRoute();
  const navigation = useNavigation(); 

  const { classId, className } = route.params;
  const romanClass = toRoman(className.replace(/\D/g, ''));
  
  const [classDetails, setClassDetails] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    pincode: '',
    school: '',
    electives: [],
  });
  const [formErrors, setFormErrors] = useState({});  

  const handleSubmitForm = async () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
    errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Enter a valid email';
    }
    if (!formData.mobile.trim()) errors.mobile = 'Mobile number is required';
    if (!formData.pincode.trim()) errors.pincode = 'Pincode is required';
    if (formData.electives.length === 0) errors.electives = 'Select at least one elective';

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        // ✅ Step 1: Create order with PENDING status
        const res = await axios.post(`${BASE_URL}/api/orders`, {
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          pincode: formData.pincode,
          school: formData.school || '',
          electives: formData.electives,
          classId,
          status: 'PENDING', // Explicit status
        });

        console.log("RES-DAAAAATAAAAA", res.data)

        const { id, amount } = res.data;

        // ✅ Step 2: Navigate to PaymentScreen with necessary data
        navigation.navigate('PaymentScreen', {
          id,
          orderAmount: amount,
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
        });

        setShowFormModal(false);
      } catch (err) {
        console.error('Error creating order:', err.message);
        Alert.alert('Error', 'Something went wrong while saving your details.');
      }
    }
  };

  useEffect(() => {
    fetchClassDetails();
  }, []);

  const fetchClassDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/boards/${classId}`);
      const data = await response.json();

      if (data && data.length > 0) {
        // Check for default board
        const defaultBoard = data.find(
          (board) => board.name === 'DEFAULT-Class-9' || board.name === 'DEFAULT-Class-10'
        );

        if (defaultBoard) {
          // Skip modal and directly fetch subjects for default board
          setSelectedBoard(defaultBoard.id);
          fetchSubjectsById(defaultBoard.id); // new function call
        } else {
          // Show modal if no default board
          setClassDetails(data);
          setShowModal(true);
        }
      } else {
        // No boards → directly fetch subjects using classId
        fetchSubjectsForClassOnly();
      }
    } catch (error) {
      console.error('Error fetching class details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjectsForClassOnly = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/subjects/class/${classId}`);
      if (!response.ok) throw new Error("Failed to fetch subjects for class");

      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching class subjects:', error.message);
    }
  };

  const fetchSubjectsById = async (boardId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/subjects/${boardId}`);
      if (!response.ok) throw new Error("Failed to fetch subjects");

      const data = await response.json();
      setSubjects(data);
      setShowModal(false); // in case modal is open
    } catch (error) {
      console.error('Error fetching subjects:', error.message);
    }
  };

  // Use this in modal submit:
  const fetchSubjects = () => {
    if (!selectedBoard) return;
    fetchSubjectsById(selectedBoard);
  };

  const coreSubjects = subjects.filter((subject) => subject.subjectType === 'CORE');
  const electiveSubjects = subjects.filter((subject) => subject.subjectType === 'ELECTIVE');

  if (loading) {
    return <ActivityIndicator size="large" color="#00dc82" style={{ marginTop: 40 }} />;
  }

  return (
    <>
      {/* <Banner /> */}

      {/* <ImageBackground
        source={require('../assets/header-background.jpg')} 
        style={styles.container}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={styles.overlay} />

        <View style={styles.content}>
          <Text style={styles.title}>Master Classroom</Text>
          <Text style={styles.subtitle}>{className?.toUpperCase()}</Text>
          <Text style={styles.description}>
            “Complete learning package with video lessons, solved exercises, and course materials.”
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowFormModal(true)}
          >
            <FontAwesome name="graduation-cap" size={16} color="#000" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>START LEARNING NOW</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>  */}     

      <ScrollView style={styles.wrapper}>

        <BannerSection
          backgroundImage={require('../assets/header-background.jpg')}
          title="Master Classroom"
          subtitle={className?.toUpperCase()}
          description="Complete learning package with video lessons, solved exercises, and course materials."
          onPress={() => setShowFormModal(true)}
        />
        
        <FeatureGrid />

        <View style={styles.whatYoullLearnSection}>
          <Text style={styles.sectionTitle}>What You'll Learn</Text>
          <Text style={styles.sectionQuote}>
            {`“Master the Class ${romanClass} SEBA syllabus with top educators – structured, simplified, and complete with Edu 1.”`}
          </Text>
        </View>

        <View style={styles.learnCard}>
          <Text style={styles.learnTitle}>Topic-Wise Explanation</Text>
          <View style={styles.progressBox}>
            <Text style={styles.progressText}>
              400+ topic-wise video lessons by expert teachers
            </Text>
            {/* <Text style={styles.percent}>100%</Text> */}
          </View>
        </View>

        <View style={styles.learnCard}>
          <Text style={styles.learnTitle}>Book Exercise</Text>
          <View style={styles.progressBox}>
            <Text style={styles.progressText}>
              Complete book exercise solutions explained in easy video format
            </Text>
            {/* <Text style={styles.percent}>100%</Text> */}
          </View>
        </View>

        <View style={styles.learnCard}>
          <Text style={styles.learnTitle}>Brainstorming</Text>
          <View style={styles.progressBox}>
            <Text style={styles.progressText}>
              Fueling young minds through dynamic brainstorming videos
            </Text>
            {/* <Text style={styles.percent}>99.99%</Text> */}
          </View>
        </View>        
      
        {/* Modal for board selection */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* CLOSE ICON for this modal */}
              <TouchableOpacity
                style={styles.modalCloseIcon}
                onPress={() => {
                  setShowModal(false);
                  navigation.goBack(); // Or navigation.navigate('Home')
                }}
              >
                <AntDesign name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Select a Board</Text>
              <FlatList
                data={classDetails}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={() => setSelectedBoard(item.id)}
                  >
                    <View style={[styles.radioButton, selectedBoard === item.id && styles.radioButtonSelected]} />
                    <Text style={styles.radioLabel}>
                      {item.name.replace(/-Class-\d+/, '').replace(/-/g, ' ')}
                    </Text>
                  </TouchableOpacity>
                )}
              />

              <Pressable
                style={[styles.closeButton, { backgroundColor: selectedBoard ? '#00dc82' : '#ccc' }]}
                onPress={fetchSubjects}
                disabled={!selectedBoard}
              >
                <Text style={styles.closeButtonText}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>




        <Modal visible={showFormModal} transparent={true} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalCloseIcon}
                onPress={() => setShowFormModal(false)}
              >
                <AntDesign name="close" size={20} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Fill Your Details</Text>

              <TextInput
                placeholder="Full Name"
                style={styles.input}
                value={formData.fullName}
                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
              />
              {formErrors.fullName && <Text style={styles.error}>{formErrors.fullName}</Text>}

              <TextInput
                placeholder="Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
              />
              {formErrors.email && <Text style={styles.error}>{formErrors.email}</Text>}

              <TextInput
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                style={styles.input}
                value={formData.mobile}
                onChangeText={(text) => setFormData({ ...formData, mobile: text })}
              />
              {formErrors.mobile && <Text style={styles.error}>{formErrors.mobile}</Text>}

              <TextInput
                placeholder="Pincode"
                keyboardType="numeric"
                style={styles.input}
                value={formData.pincode}
                onChangeText={(text) => setFormData({ ...formData, pincode: text })}
              />
              {formErrors.pincode && <Text style={styles.error}>{formErrors.pincode}</Text>}

              <TextInput
                placeholder="School Name (Optional)"
                style={styles.input}
                value={formData.school}
                onChangeText={(text) => setFormData({ ...formData, school: text })}
              />

              <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Select Elective Subjects:</Text>
              {electiveSubjects.map((subject) => (
                <TouchableOpacity
                  key={subject.id}
                  style={styles.checkboxRow}
                  onPress={() => {
                    const isSelected = formData.electives.includes(subject.id);
                    const updated = isSelected
                      ? formData.electives.filter((id) => id !== subject.id)
                      : [...formData.electives, subject.id];
                    setFormData({ ...formData, electives: updated });
                  }}
                >
                  <View style={[styles.checkbox, formData.electives.includes(subject.id) && styles.checkedBox]} />
                  <Text>{subject.name}</Text>
                </TouchableOpacity>
              ))}
              {formErrors.electives && <Text style={styles.error}>{formErrors.electives}</Text>}

              <Pressable
                style={[styles.closeButton, { backgroundColor: '#00dc82', marginTop: 20 }]}
                onPress={handleSubmitForm}
              >
                <Text style={styles.closeButtonText}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>


        {coreSubjects.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionHeader}>CORE SUBJECTS</Text>

            <View style={styles.statsRow}>
              <Text style={styles.statText}>55+ Videos</Text>
              <Text style={styles.statText}>{coreSubjects.length} Subjects</Text>
              <Text style={styles.statText}>125+ Hours</Text>
            </View>

            {coreSubjects.map((subject, index) => {
              const isOpen = openIndex === `core-${index}`;
              return (
                <View key={subject.id} style={styles.subjectContainer}>
                  <TouchableOpacity
                    style={styles.subjectHeader}
                    onPress={() => setOpenIndex(isOpen ? null : `core-${index}`)}
                  >
                    <Text style={styles.subjectTitle}>{subject.name}</Text>
                    <AntDesign name={isOpen ? 'up' : 'down'} size={16} color="#333" />
                  </TouchableOpacity>
                  <Collapsible collapsed={!isOpen}>
                    <View style={styles.subjectContent}>
                      <Text style={styles.bullet}>• {subject.chapters || '12 Chapters'}</Text>
                      <Text style={styles.bullet}>• {subject.videos || '45+ videos'}</Text>
                      <Text style={styles.bullet}>• {subject.hours || '100+ hours of content'}</Text>
                      <Text style={styles.bullet}>• {subject.materials || 'Pdf materials'}</Text>
                    </View>
                  </Collapsible>
                </View>
              );
            })}
          </View>
        )}


        {electiveSubjects.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionHeader}>ELECTIVE SUBJECTS</Text>

            <View style={styles.statsRow}>
              <Text style={styles.statText}>55+ Videos</Text>
              <Text style={styles.statText}>{electiveSubjects.length} Subjects</Text>
              <Text style={styles.statText}>125+ Hours</Text>
            </View>

            {electiveSubjects.map((subject, index) => {
              const isOpen = openIndex === `elective-${index}`;
              return (
                <View key={subject.id} style={styles.subjectContainer}>
                  <TouchableOpacity
                    style={styles.subjectHeader}
                    onPress={() => setOpenIndex(isOpen ? null : `elective-${index}`)}
                  >
                    <Text style={styles.subjectTitle}>{subject.name}</Text>
                    <AntDesign name={isOpen ? 'up' : 'down'} size={16} color="#333" />
                  </TouchableOpacity>
                  <Collapsible collapsed={!isOpen}>
                    <View style={styles.subjectContent}>
                      <Text style={styles.bullet}>• {subject.chapters || '12 Chapters'}</Text>
                      <Text style={styles.bullet}>• {subject.videos || '45+ videos'}</Text>
                      <Text style={styles.bullet}>• {subject.hours || '100+ hours of content'}</Text>
                      <Text style={styles.bullet}>• {subject.materials || 'Pdf materials'}</Text>
                    </View>
                  </Collapsible>
                </View>
              );
            })}
          </View>
        )}

        {/* Demo Section Starts  */}
        <BannerSection
          backgroundImage={require('../assets/demo-thumbnail.jpg')}
          title="Master Classroom"
          subtitle={className?.toUpperCase()}
          description="“Explore how our expert teachers simplify complex topics using animations, visuals, and real-life examples.”"          
        />

        <DemoVideos
          title="General Science"
          description="Experience interactive science learning with clear explanations, animations, and topic-wise coverage of Physics, Chemistry, and Biology – based on the SEBA syllabus."
          highlights={[
            'Real-world application examples',
            'Animated science diagrams and experiments',
            'Chapter-wise structure',
            'Notes for quick revisions'
          ]}          
          videoId="oe70Uhjc_F4"
        />

        <DemoVideos
          title="General Mathematics"
          description="Watch how we make math easy with step-by-step visual explanations, shortcuts, and chapter-aligned lessons for problem solving."
          highlights={[
            'Conceptual clarity with visuals',
            'Step-by-step problem solving',
            'Real exam-style question discussion',
            'Practice-focused content',
            'Time-saving shortcuts',
            'Formula sheets in PDF'
          ]}          
          videoId="xzxI-7mWVCI"
        />

        <DemoVideos
          title="Advanced Mathematics"
          description="Explore elective-level topics like trigonometry, geometry, and more with deep-dive video lessons by experienced mentors."
          highlights={[
            'Deep-dive into complex topics',
            'Logical and visual breakdowns',
            'Higher-level practice problems',
            'Elective-focused preparation',
            'Video solutions to textbook exercises',
            'Extra PDF resources for scoring high'
          ]}          
          videoId="x7gqoHNgO-g"
        />

      </ScrollView>
    </>
    
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    // flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    margin: 24,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#00dc82',
    marginRight: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#00dc82',
  },
  radioLabel: {
    fontSize: 16,
  },
  modalItem: {
    fontSize: 16,
    paddingVertical: 6,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  
  
  
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#00ff66',
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
  },

  statText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 13,
  },

  subjectContainer: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 1,
    paddingHorizontal: 10,
  },

  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },

  subjectTitle: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
  },

  subjectContent: {
    paddingBottom: 12,
    paddingLeft: 10,
  },

  bullet: {
    fontSize: 14,
    color: '#333',
    paddingVertical: 2,
  },

  /* styles for form */

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#00dc82',
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: '#00dc82',
  },
  modalCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },

  /* styles for banner section*/
  container: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    zIndex: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    color: '#00ff66',
    fontWeight: 'bold',
    marginTop: 4,
  },
  description: {
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00ff66',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },

  /*styles for what you will learn section */

  whatYoullLearnSection: {
    marginVertical: 25,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },

  sectionQuote: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 24,
  },

  learnCard: {
    backgroundColor: '#fff',   // White background
    borderRadius: 10,          // Rounded corners
    padding: 16,               // Inner spacing
    marginBottom: 16,          // Space between cards
    
    // ✅ Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // ✅ Shadow for Android
    elevation: 4,
  },

  learnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },

  progressBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    marginRight: 10,
  },

  percent: {
    fontWeight: 'bold',
    color: '#00c853',
  },

  modalCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 6,
  }

});