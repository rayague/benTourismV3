import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

export default function ElevatedCards() {
  return (
    <SafeAreaView>
      <Text style={styles.headingText}>Les lieux tendances du Bénin</Text>
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://www.gouv.bj/upload/images/articles/ckeditor/amazone.jpg',
            }}
            style={styles.imageCard}
          />
        </View>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://africaho.bj/wp-content/uploads/2024/03/bio-guera-1.webp',
            }}
            style={styles.imageCard}
          />
        </View>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKuHxacSTVM3_SCPhGK4JOaJMAycsF-VoMILtyWFAZAA&s',
            }}
            style={styles.imageCard}
          />
        </View>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://media-cdn.tripadvisor.com/media/photo-s/03/ee/ad/d7/benin-marina-hotel.jpg',
            }}
            style={styles.imageCard}
          />
        </View>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://www.ahstatic.com/photos/b845_sm_00_p_1024x768.jpg',
            }}
            style={styles.imageCard}
          />
        </View>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://live.staticflickr.com/65535/52258732476_9efbd5ecfd_b.jpg',
            }}
            style={styles.imageCard}
          />
        </View>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://www.peiaassociati.it/wp-content-pesecure/uploads/2016/01/00-16-e1328108115156-1400x736.jpg',
            }}
            style={styles.imageCard}
          />
        </View>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://www.jeuneafrique.com/medias/2022/03/15/muse-international-du-vaudou-porto-novo.png',
            }}
            style={styles.imageCard}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  container: {
    padding: 8,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width:250,
    // height:250,
    borderRadius: 4,
    margin: 8,
    elevation: 5,
    // backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  elevatedCard: {
  },
  imageCard: {
    width: 340,
    height: 200,
  },
});
