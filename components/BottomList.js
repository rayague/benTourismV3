import React from 'react';
import {FlatList, View, Text, Image, StyleSheet} from 'react-native';

const data = [
  {
    id: '1',
    title: 'Premier élément',
    description: 'Description du premier élément',
    imageUrl:
      'https://via.placeholder.com/640x480.png/004466?text=animals+omnis',
  },
  {
    id: '2',
    title: 'Deuxième élément',
    description: 'Description du deuxième élément',
    imageUrl:
      'https://via.placeholder.com/640x480.png/004466?text=animals+omnis',
  },
  {
    id: '3',
    title: 'Deuxième élément',
    description: 'Description du deuxième élément',
    imageUrl:
      'https://via.placeholder.com/640x480.png/004466?text=animals+omnis',
  },
  {
    id: '4',
    title: 'Deuxième élément',
    description: 'Description du deuxième élément',
    imageUrl:
      'https://via.placeholder.com/640x480.png/004466?text=animals+omnis',
  },
  {
    id: '5',
    title: 'Deuxième élément',
    description: 'Description du deuxième élément',
    imageUrl:
      'https://via.placeholder.com/640x480.png/004466?text=animals+omnis',
  },
  // Ajoutez autant d'éléments que nécessaire
];

const renderItem = ({item}) => (
  <View style={styles.itemContainer}>
    <Image source={item.imageUrl} style={styles.image} />

    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  </View>
);

const BottomList = () => {
  return (
    <View style={styles.listContainter}>
      <Text style={styles.textAgnecy}>Découvrez nos Agences</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dcca',
    marginHorizontal: 20,
    marginVertical: 10,
    // elevation: 20,
  },
  listContainter: {
    borderBottomColor: '#acca',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 100,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
  textAgnecy: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});

export default BottomList;
