import {
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function ActionCard() {
  function openWesite(websiteLink) {
    Linking.openURL(websiteLink);
  }
  return (
    <View style={styles.listContainer}>
      <Text style={styles.headingText}>À Découvrir</Text>
      <View style={[styles.card, styles.elevatedCard]}>
        <View style={styles.headingContainer}>
          <Text style={styles.hederText}>
            Découvrez le Bénin comme jamais auparavant
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            openWesite(
              'https://monkadi.com/products/livre-conte-pourquoi-les-singes-et-autres-contes-du-benin-%F0%9F%93%9A-%F0%9F%93%8D-produit-livre-gratuitement/',
            )
          }>
          <Image
            source={{
              uri: 'https://visiter-le-benin.com/wp-content/uploads/2020/07/Zagnanado.jpg',
            }}
            style={styles.cardImage}
          />
        </TouchableOpacity>

        <View style={styles.bodyContainer}>
          <Text numberOfLines={4}>
            Explorez Notre Application pour découvrir des histoires captivantes
            et des légendes ancestrales, ou partez à l'aventure avec
            BéninExplorer pour découvrir des trésors cachés et des destinations
            uniques.
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() =>
              openWesite(
                'https://monkadi.com/products/livre-conte-pourquoi-les-singes-et-autres-contes-du-benin-%F0%9F%93%9A-%F0%9F%93%8D-produit-livre-gratuitement/',
              )
            }>
            <Text style={styles.headingText2}>
              Téléchargez dès maintenant et laissez-vous envoûter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  headingText2: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingBottom: 10,
    color: 'red',
  },
  card: {
    alignItems: 'center',
    elevation: 20,  

  },
  elevatedCard: {},
  headingContainer: {
    margin: 10,
    // fontSize:20,
    // fontWeight:'700'
    elevation: 20,  

  },
  hederText: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardImage: {
    width: 300,
    height: 200,
    borderRadius: 6,
    marginBottom: 0,
    elevation: 20,  
  },
  bodyContainer: {
    // fontSize:18,
    // fontWeight:'600',
    marginHorizontal: 15,
    marginVertical: 12,
    elevation: 20,  

  },
  footerContainer: {
    // fontSize:18,
    // fontWeight:'600'
  },
  listContainer: {
    marginBottom: 80,
  },
});
