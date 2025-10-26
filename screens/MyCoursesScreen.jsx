// MyCoursesScreen.jsx
import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import BASE_URL from "../config/config";

export default function MyCoursesScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) fetchUserCourses();
  }, [user]);

  const fetchUserCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/orders/user/${user.email}`);
      setMyCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00dc82" style={{ marginTop: 50 }} />;
  }

  if (myCourses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You have not enrolled in any courses yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={myCourses}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.courseCard}
          onPress={() =>
            navigation.navigate("ClassDetails", {
              classId: item.classId,
              className: item.class?.name || "Your Course",
            })
          }
        >
          <Image
            source={{ uri: item.class?.thumbnail || "https://via.placeholder.com/150" }}
            style={styles.thumbnail}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.class?.name}</Text>
            <Text style={styles.subtitle}>{item.class?.description || "Purchased course"}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 15,
  },
  courseCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    padding: 10,
  },
  thumbnail: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    color: "#777",
    marginTop: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#555",
    fontSize: 16,
  },
});
