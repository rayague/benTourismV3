import {StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import FlatCards from '../components/FlatCards';
import ElevatedCards from '../components/ElevatedCards';
import Fanceycard from '../components/Fanceycard';
import ActionCard from '../components/ActionCard';

export default function Home() {
  return (
    <SafeAreaView>
      <ScrollView>
        <FlatCards />
        <ElevatedCards />
        <Fanceycard />
        <ActionCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
