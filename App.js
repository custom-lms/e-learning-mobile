import React, { useContext, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import OfferedCourses from './components/OfferedCourses';
import ClassDetails from './screens/ClassDetails';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MyCoursesScreen from './screens/MyCoursesScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import PaymentScreen from './screens/PaymentScreen'; 
import { AuthProvider, AuthContext } from './context/AuthContext';
import { StripeProvider } from '@stripe/stripe-react-native';


const STRIPE_PUBLISHABLE_KEY = 'pk_test_51RkK4vIg8Lvf5AqZFzMswDBowBNffe5eMRMuSlBl2ChjZHSKNe19nntwSZGwXsQwdjJWKZmoJuqUxHnkSOzUeCjK00mdpdDSxG';

const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OfferedCourses" component={OfferedCourses} />
      <Stack.Screen name="ClassDetails" component={ClassDetails} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
}

function AccountStack() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : (
        <Stack.Screen name="MyAccount" component={MyAccountScreen} />
      )}
    </Stack.Navigator>
  );
}

function AppTabs() {
  const { user } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#00ff7f',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'MyCourses') iconName = 'book-outline';
          else if (route.name === 'Account') iconName = user ? 'person-outline' : 'log-in-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      {user && <Tab.Screen name="MyCourses" component={MyCoursesScreen} />}
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarLabel: user ? 'My Account' : 'Login',
        }}
      />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}        
    >
      <AuthProvider>      
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
              <RootStack.Screen name="MainTabs" component={AppTabs} />            
           </RootStack.Navigator>
        </NavigationContainer>      
      </AuthProvider>
    </StripeProvider>      
  );
}
