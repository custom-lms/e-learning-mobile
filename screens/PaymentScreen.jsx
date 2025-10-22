// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
// import { useStripe } from '@stripe/stripe-react-native';
// import BASE_URL from '../config/config';
// import axios from 'axios';

// export default function PaymentScreen({ route, navigation }) {
//   const { id, fullName, mobile } = route.params;

//   const { initPaymentSheet, presentPaymentSheet } = useStripe();
//   const [loading, setLoading] = useState(true);

//   const fetchPaymentSheetParams = async () => {
//     try {
//       const response = await axios.post(`${BASE_URL}/api/payments/create-order`, {
//         amount: 100, // Replace with dynamic amount if needed
//         name: fullName,
//         phone: mobile,
//         id,
//       });

//       const data = response.data;

//       return {
//         paymentIntent: data.clientSecret,
//         customer: data.customer,
//         ephemeralKey: data.ephemeralKey,
//         publishableKey: data.publishableKey,
//       };
//     } catch (error) {
//       console.error('❌ Stripe API error:', error.response?.data || error.message);
//       throw new Error('Stripe API call failed');
//     }
//   };

//   const initializePaymentSheet = async () => {
//     try {
//       const {
//         paymentIntent,
//         customer,
//         ephemeralKey,
//         publishableKey,
//       } = await fetchPaymentSheetParams();

//       const initSheet = await initPaymentSheet({
//         merchantDisplayName: 'Your App Name',
//         customerId: customer,
//         customerEphemeralKeySecret: ephemeralKey,
//         paymentIntentClientSecret: paymentIntent,
//         allowsDelayedPaymentMethods: false,
//       });

//       if (initSheet.error) {
//         console.error(initSheet.error);
//         Alert.alert('Error', 'Failed to initialize payment sheet');
//         return;
//       }

//       const result = await presentPaymentSheet();

//       if (result.error) {
//         Alert.alert('Payment Cancelled', result.error.message);
//         navigation.goBack();
//       } else {
//         // ✅ Payment success, update order in DB
//         await axios.patch(`${BASE_URL}/api/orders/${id}`, {
//           status: 'COMPLETED',
//           paymentMode: 'STRIPE',
//         });

//         Alert.alert('Payment Success!');
//         navigation.navigate('Home');
//       }
//     } catch (err) {
//       console.error('Stripe Payment Error:', err);
//       Alert.alert('Error', 'Something went wrong with payment.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     initializePaymentSheet();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#00dc82" />
//       ) : (
//         <Text style={styles.text}>Initializing Payment...</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   text: { fontSize: 16, fontWeight: '500' },
// });



import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import BASE_URL from '../config/config';

export default function PaymentScreen({ route, navigation }) {
  const { id, fullName, mobile } = route.params;
  const [loading, setLoading] = useState(true);

  const initializeRazorpayPayment = async () => {
    try {
      // 1️⃣ Create order on your backend
      const response = await axios.post(`${BASE_URL}/api/payments/create-order`, {
        amount: 100, // ₹100
        currency: 'INR',
      });

      const order = response.data;

      // 2️⃣ Configure Razorpay checkout options
      const options = {
        description: 'Order Payment',
        image: 'https://your-logo-url.com/logo.png', // Optional
        currency: 'INR',
        key: 'rzp_test_RWSr8luH5gRlNF', // ⚠️ from Razorpay Dashboard
        amount: order.amount,
        order_id: order.id,
        name: 'Your App Name',
        prefill: {
          name: fullName,
          contact: mobile,
          email: 'customer@example.com',
        },
        theme: { color: '#00dc82' },
      };

      // 3️⃣ Open Razorpay checkout UI
      RazorpayCheckout.open(options)
        .then(async (paymentData) => {
          // 4️⃣ Verify payment on backend
          const verifyRes = await axios.post(`${BASE_URL}/api/payments/verify`, paymentData);

          if (verifyRes.data.success) {
            // 5️⃣ Update your order as completed
            await axios.patch(`${BASE_URL}/api/orders/${id}`, {
              status: 'COMPLETED',
              paymentMode: 'RAZORPAY',
            });

            Alert.alert('✅ Payment Success', 'Your payment was successful!');
            navigation.navigate('Home');
          } else {
            Alert.alert('⚠️ Payment Verification Failed', 'Could not verify payment.');
            navigation.goBack();
          }
        })
        .catch((error) => {
          console.error('❌ Payment Failed:', error);
          Alert.alert('Payment Cancelled', error.description || 'Payment was cancelled.');
          navigation.goBack();
        });
    } catch (err) {
      console.error('❌ Razorpay Error:', err);
      Alert.alert('Error', 'Something went wrong with payment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeRazorpayPayment();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00dc82" />
      ) : (
        <Text style={styles.text}>Processing Payment...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 16, fontWeight: '500' },
});
