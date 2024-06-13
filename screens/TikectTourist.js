import { StyleSheet, Text, View, RefreshControl, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

export default function TikectTourist() {

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text>Pull down to see RefreshControl indicator</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})