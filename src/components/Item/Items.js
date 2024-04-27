import React, { useState, useEffect } from "react";
import { Modal, TouchableOpacity, ActivityIndicator, Text, StyleSheet, View, Image } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function States({
  stateCode,
  funfacts,
  date,
  images,
  renderRightActions,
  showSwipeIcon = true,
  showEdit = true,
}) {

  const formatDate = (dateString) => {
    try {
      const dateObj = new Date(dateString);
      return !isNaN(dateObj.getTime())
        ? dateObj.toLocaleDateString("en-US", {
            year: 'numeric', month: 'short', day: 'numeric'
          })
        : "Invalid Date";
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Error in date";
    }
  };

  const renderImages = () => {
    return images?.map((img, index) => {
      const [width, setWidth] = useState(0);
      const [loading, setLoading] = useState(true);
  
      useEffect(() => {
        Image.getSize(img, (width, height) => {
          const aspectRatio = width / height;
          const calculatedWidth = 125 * aspectRatio; 
          setWidth(calculatedWidth);
          setLoading(false);
        });
      }, [img]);
  
      return (
        <View 
          key={index} 
          style={{ width: width + 4, marginLeft: 10 }}>
        {loading ? (
          <ActivityIndicator size="small" color="transparent" style={{ height: 0 }} />
        ) : (
          <Image
            source={{ uri: img }}
            style={{
              borderWidth: 2,
              borderColor: 'hsl(270, 50%, 60%)',
              height: 125,
              width: width, 
              resizeMode: 'contain',
              borderRadius: 10,
              marginBottom: 2,
            }}
          />
        )}
      </View>
    );
  });
};

  return (
    <Swipeable renderRightActions={renderRightActions}>

          <View style={styles.mainContainer}> 
          <Text style={styles.stateCode}>{stateCode}</Text>      
          <View style={styles.descriptionContainer}>
            {funfacts.map((fact, index) => (
              <Text key={index} style={styles.description}>
                {index + 1}. {fact}
              </Text>
            ))}
          </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {images.map((img, index) => (
                <View key={index} style={{ marginLeft: 10 }}>
                  <Image
                    source={{ uri: img }}
                    style={{
                      borderWidth: 2,
                      borderColor: 'hsl(270, 50%, 60%)',
                      height: 125,
                      width: 125,
                      resizeMode: 'contain',
                      borderRadius: 10,
                      marginBottom: 2,
                    }}
                  />
                </View>
              ))}
            </View>
            <View style={styles.rowContainer}>
            <Text style={styles.date}>{formatDate(date)}</Text>
            {showEdit && <Text style={styles.edit}>                                     Edit</Text>}
            {showSwipeIcon && 
              <MaterialCommunityIcons name="gesture-swipe-left" size={30} color="hsl(270, 50%, 60%)" marginRight={25} />
            } 
            </View>
          </View>
        
    </Swipeable>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: "#F7E7F8",
        flexDirection: "column",
        paddingLeft: "5%",
        paddingRight: "5%",
        borderWidth: 1,
        borderColor: 'hsl(270, 50%, 60%)',
        margin: "1%"
      },
      rowContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
      },
    
      description: {
        fontWeight: "bold",
        fontSize: 25,
        padding: 5,
        color: 'hsl(270, 50%, 60%)',
        backgroundColor: "#F7E7F8",
        marginTop: 10
      },
      date: {
        padding: 5,
        color: 'hsl(270, 50%, 60%)',
        backgroundColor: "#F7E7F8",
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 14,
      },
      edit: {
        padding: 5,
        color: 'hsl(270, 50%, 60%)',
        backgroundColor: "#F7E7F8",
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 14,
        alignItems: 'center',
      },
      stateCode: {
        padding: 5,
        color: 'hsl(270, 50%, 60%)',
        backgroundColor: "#F7E7F8",
        fontWeight: "bold",
        fontSize: 14,
      },
});