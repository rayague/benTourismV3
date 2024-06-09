import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const eventsData = [
  {
    id: 1,
    title: 'Festival de la Culture',
    description: 'Un festival pour célébrer la diversité culturelle.',
    datePosted: '2024-05-20',
    agency: 'Agence Culturelle', 
    image: 'https://savelifeonearth.eu/wp-content/uploads/2021/07/la-contribution-du-tourisme.jpg',
  },
  {
    id: 2,
    title: 'Conférence sur le Climat',
    description: 'Une conférence pour discuter des changements climatiques.',
    datePosted: '2024-05-15',
    agency: 'Agence Environnementale',
    image: 'https://pre-webunwto.s3.eu-west-1.amazonaws.com/2023-09/international-tourism-swiftly-overcoming-pandemic-downturn.jpg?VersionId=4fzbgc78JHvwOKuqn0VyS1IRwIxhUjWi',
  },
  {
    id: 3,
    title: 'Concert de Musique Classique',
    description: 'Un concert avec des performances de musiciens célèbres.',
    datePosted: '2024-05-18',
    agency: 'Agence Musicale',
    image: 'https://misterprepa.net/wp-content/uploads/2022/09/Le-tourisme-en-Espagne-1024x580.png',
  },
];

export default function Event() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headingText}>Événements à venir</Text>
      {eventsData.map(event => (
        <View key={event.id} style={styles.card}>
          <Image source={{ uri: event.image }} style={styles.cardImage} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{event.title}</Text>
            <Text style={styles.cardDescription}>{event.description}</Text>
            <Text style={styles.cardDate}>Posté le : {event.datePosted}</Text>
            <Text style={styles.cardAgency}>Agence : {event.agency}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headingText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cardAgency: {
    fontSize: 14,
    color: '#666',
  },
});
