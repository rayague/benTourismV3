// components/LoadingOverlay.js
import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal, Text} from 'react-native';

const LoadingOverlay = ({visible}) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.chargement}>
            Chargement...
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#000000',
    height: 500,
    width: 300,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chargement: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default LoadingOverlay;
