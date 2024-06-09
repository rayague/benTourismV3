import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function FlatCards() {
  return (
    <>
      <Text style={styles.headingText}>Bienvenu au Bénin</Text>
      <View style={styles.container}>
        <View style={[styles.card, styles.cardone]}>
          <Image
            source={{
              uri: 'https://www.beninrevele.com/wp-content/uploads/2017/12/presidence-de-la-republique-benin.jpg',
            }}
            style={styles.cardImage}
          />
        </View>
        <View style={[styles.card, styles.cardtwo]}>
          <Image
            source={{
              uri: 'https://beninsite.net/wp-content/uploads/2021/08/presidence-BENIN-720x400-1.jpg',
            }}
            style={styles.cardImage}
          />
        </View>
        {/* <View style={[styles.card , styles.cardthree]}>
            <Text>green</Text>
        </View> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    width: 170,
    height: 100,
    elevation: 20,

  },
  headingText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent:'center',
    // alignItems:'center',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width:125,
    // height:125,
    borderRadius: 4,
    margin: 8,
    elevation: 20,
  },
  cardone: {
    backgroundColor: 'orange',
  },
  cardtwo: {
    backgroundColor: '#ffffff', 
    elevation: 20,
      
  },
  cardthree: {
    backgroundColor: 'green',
  },
  cardfour: {
    backgroundColor: 'red',
  },
});
