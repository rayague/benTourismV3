import {StyleSheet, Text, SafeAreaView, ScrollView,   RefreshControl,} from 'react-native';
import React from 'react';
import FlatCards from '../components/FlatCards';
import ElevatedCards from '../components/ElevatedCards';
import Fanceycard from '../components/Fanceycard';
import ActionCard from '../components/ActionCard';

export default function Home() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  return (
    <SafeAreaView>
      <ScrollView         
              contentContainerStyle={styles.scrollView}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
      >
        <FlatCards />
        <ElevatedCards />
        <Fanceycard />
        <ActionCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
