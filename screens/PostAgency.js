import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function PostAgency() {
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View>
      <Text>PostAgency</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
