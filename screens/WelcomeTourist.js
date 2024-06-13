import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const { width: viewportWidth } = Dimensions.get("window");

const WelcomeTourist = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const carouselItems = [
    {
      imageUrl:
        "https://cdn.pixabay.com/photo/2017/04/11/23/16/benin-2223164_1280.jpg"
    },
    {
      imageUrl:
        "https://samapass.com/blog/wp-content/uploads/2021/05/place_jean_bayol_porto_novo_benin-1.jpg"
    },
    {
      imageUrl:
        "https://samapass.com/blog/wp-content/uploads/2021/05/ganvie-TripAdvisor.jpg"
    },
    {
      imageUrl:
        "https://www.doublesens.fr//modules/everpsblog/views/img/posts/post_image_258.jpg"
    },
    {
      imageUrl:
        "https://samapass.com/blog/wp-content/uploads/2021/05/elephants-parc-pendjari.jpg"
    },
    {
      imageUrl:
        "https://samapass.com/blog/wp-content/uploads/2021/05/hills-5149026_1920.jpg"
    },
    {
      imageUrl:
        "https://samapass.com/blog/wp-content/uploads/2021/05/Fondation-Zinsou-2048x1399.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % carouselItems.length;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    </View>
  );

  const handleProfileTourist = () => {
    navigation.navigate("Profile Touriste");
  };
  const handleChatTourist = () => {
    navigation.navigate("Messages Touriste");
  };

  const handleRegisteredHome = () => {
    navigation.navigate("Acceuil");
  };

  const handleBooking = () => {
    navigation.navigate("Mes Réservations");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue</Text>
      <FlatList
        data={carouselItems}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        style={styles.carousel}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegisteredHome}>
          <Icon name="home" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Icon name="book" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleChatTourist}>
          <Icon name="wechat" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleProfileTourist}>
          <Icon name="user" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  carousel: {
    flexGrow: 0
  },
  slide: {
    backgroundColor: "#5dade2",
    borderRadius: 10,
    width: viewportWidth - 60,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    elevation: 5
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    elevation: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  button: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 55,
    margin: 5,
    elevation: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10
  }
});

export default WelcomeTourist;

<img
  data-testid="image-asset"
  src="https://media.istockphoto.com/id/172372825/fr/photo/sc%C3%A8ne-de-rue-africaine.jpg?s=1024x1024&amp;w=is&amp;k=20&amp;c=twEp6FnOa27_GKWmpRNgl5NGs-6yBwwTudO2uMJvusc="
  alt="Scène de rue africaine - Photo de Afrique libre de droits"
  title="Scène de rue africaine - Photo de Afrique libre de droits"
  style="max-height:668px;max-width:100%;object-fit:scale-down;width:auto;height:auto"
  fetchpriority="high"
></img>;
