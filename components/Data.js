import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import FR from './fr'
import { userDataContext } from '../context/userDataContext';
import { menuContext } from '../context/menuContext';

const Data = () => {
    const userData = useContext(userDataContext);
    const {game, setGame} = useContext(menuContext);
  return (
    <View>
          <Text>{ userData.name}</Text>
          <Text>{game}</Text>
          <Button title='Modifier' onPress={() => setGame('xbox')} />
          <FR />
    </View>
  )
}

export default Data

const styles = StyleSheet.create({})