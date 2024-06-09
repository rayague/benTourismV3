import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { userDataContext } from '../context/userDataContext'

const FR = () => {
  const brolito = useContext(userDataContext);s
    const [userUid, setUserUid] = useState('');
  const [userData, setUserData] = useState('');
  const [game, setGame] = useState('PlayStation')

  console.log('====================================');
  console.log(userData);
  console.log('====================================');
  return (
    <View>
      <Text>{brolito.name}</Text>
      
    </View>
  )
}

export default FR

const styles = StyleSheet.create({})