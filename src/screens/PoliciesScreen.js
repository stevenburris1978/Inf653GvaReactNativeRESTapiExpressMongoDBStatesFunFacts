import React from 'react';
import { ScrollView, StatusBar, Text, StyleSheet, View, SafeAreaView } from 'react-native';

const PoliciesScreen = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={[styles.policyContainer, styles.screenBackground]} contentContainerStyle={{ paddingBottom: 30 }}>
        <StatusBar backgroundColor="#F7E7F8" barStyle="dark-content" />
        <Text style={styles.screenTitle}>POLICY:</Text>
        <Text style={styles.text}>
          Policy Info Goes Here
        </Text>
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    policyContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: 'transparent',
        paddingBottom: 30,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'hsl(270, 50%, 60%)'
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: 'hsl(270, 50%, 60%)'
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        color: 'hsl(270, 50%, 60%)'
    },
    strong: {
        fontWeight: 'bold',
        color: 'hsl(270, 50%, 60%)'
    },
    screenBackground: {
        backgroundColor: '#F7E7F8',
    },
    screenTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'hsl(270, 50%, 60%)',
      marginBottom: 10,
      marginTop: -7,
    },
});

export default PoliciesScreen;
