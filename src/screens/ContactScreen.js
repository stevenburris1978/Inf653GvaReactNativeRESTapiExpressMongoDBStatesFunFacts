import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View, StyleSheet, Linking } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ContactScreen = () => {
    
    // opens iOS and Android default email app to email 
    const handleEmailPress = () => {
        Linking.openURL('mailto:s_burris@mail.fhsu.edu');
    };

    return (
        <ScrollView style={[styles.contactContainer, styles.screenBackground]}>
            <StatusBar backgroundColor="#F7E7F8" barStyle="dark-content" />
            <Text style={styles.screenTitle}>CONTACT INFO:</Text>
            <Text style={styles.header}>Email</Text>
            <Text style={styles.text}>
                Click the email to send an email:
            </Text>
            <TouchableOpacity onPress={handleEmailPress}>
                <Text style={styles.textemail}>
                    s_burris@mail.fhsu.edu (SEND)
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contactContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: 'transparent',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'hsl(270, 50%, 60%)'
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        color: 'hsl(270, 50%, 60%)'
    },
    textemail: {
        fontSize: 16,
        margin: 5,
        color: 'hsl(270, 50%, 60%)',
        backgroundColor: '#FFF0F5',
        borderRadius: 25,
        textAlign: 'center',
        alignSelf: 'center',
        padding: 10
    },
    socialMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: '25%',
    },
    socialIcon: {
        padding: 10
    },
    screenBackground: {
        backgroundColor: '#F7E7F8',
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'hsl(270, 50%, 60%)',
        marginBottom: 40,
    },
});

export default ContactScreen;
