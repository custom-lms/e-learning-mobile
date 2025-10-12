// // MyAccountScreen.js
// import React, { useContext } from 'react';
// import { View, Text, Button } from 'react-native';
// import { AuthContext } from '../context/AuthContext';

// export default function MyAccountScreen() {
//   const { logout } = useContext(AuthContext);

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Your account details</Text>
//       <Button title="Logout" onPress={logout} />
//     </View>
//   );
// }




// MyAccountScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function MyAccountScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
    
      <StatusBar barStyle="dark-content" backgroundColor="#000" />
      <ScrollView contentContainerStyle={styles.wrapper}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>My Accounts</Text>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>

        {/* Profile Row */}
        <View style={styles.profileRow}>
          <Image
            source={require('../assets/avatar-placeholder.png')}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            {/* <Text style={styles.name}>{user?.name || 'User Name'}</Text> */}
            <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>
            <Text style={styles.studentID}>Student ID: Rak5498</Text>
          </View>
          <FeatherIcon name="chevron-right" size={22} color="#555" />
        </View>

        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Menu List */}
        {[
          { label: 'My Certificates', icon: <FontAwesome name="certificate" size={20} color="#000" /> },
          { label: 'Purchase History', icon: <Entypo name="shopping-cart" size={20} color="#000" /> },
          { label: 'Refer & Earn', icon: <FontAwesome name="money" size={20} color="#000" /> },
          { label: 'Support', icon: <FeatherIcon name="help-circle" size={20} color="#000" /> },
          { label: 'Privacy Policy', icon: <FeatherIcon name="file-text" size={20} color="#000" /> },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuRow}>
            {item.icon}
            <Text style={styles.menuText}>{item.label}</Text>
            <FeatherIcon name="chevron-right" size={20} color="#bbb" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo: {
    width: 60,
    height: 30,
    resizeMode: 'contain',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#444',
  },
  studentID: {
    fontSize: 12,
    color: '#777',
  },
  editBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#00dc82',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    marginTop: 10,
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#111',
  },
  logoutBtn: {
    marginTop: 30,
    backgroundColor: '#00dc82',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // for matching app background
  },
});
