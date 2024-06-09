import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TopNavBar = () => {
  return (
    <View style={styles.container}>
      <Icon name="home" size={30} color="#000000" />
      <Icon name="file-text" size={30} color="#000000" />
      <Icon name="bell" size={30} color="#000000" />
      <Icon name="bars" size={30} color="#000000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 60,
    borderTopWidth: 1,
  },
});

export default TopNavBar;
