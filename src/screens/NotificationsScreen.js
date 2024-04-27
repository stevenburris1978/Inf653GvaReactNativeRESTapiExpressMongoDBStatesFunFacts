import React, { useContext } from 'react';
import { FlatList, StyleSheet, View, SafeAreaView, Text } from 'react-native';
import Constants from "expo-constants";
import States from '../components/Item/Items';
import TaskContext from "../context/TaskContext";

function NotificationsScreen() {
  const { stateList } = useContext(TaskContext);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.screenTitle}>New State Fun Facts:</Text>
      <View style={styles.itemScreen}>
        <FlatList
          data={stateList}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <States
              stateCode={item.stateCode}
              funfacts={item.funfacts}
              date={item.date}  
              images={item.images}
              showSwipeIcon={false}
              showEdit={false}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.StatusBarHeight,
    backgroundColor: "#F7E7F8",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'hsl(270, 50%, 60%)',
    marginLeft: "1%",
    paddingLeft: 5,
    paddingTop: 10,
  },
  itemScreen: {
    padding: 5,
  },
});

export default NotificationsScreen;
