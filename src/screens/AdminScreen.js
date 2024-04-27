import React, { useState, useContext, useEffect } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Text, Alert, SafeAreaView } from 'react-native';
import AddState from '../components/Item/AddItem';
import Constants from "expo-constants";
import States from '../components/Item/Items';
import TaskContext from "../context/TaskContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from '../context/AuthContext';

const AdminScreen = () => {

  const { stateList, deleteState, editState, updateState, fetchStates } = useContext(TaskContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [funfacts, setFunfacts] = useState([]);
  const [stateId, setStateId] = useState(null);
  const [images, setImages] = useState([]);
  const { userToken } = useContext(AuthContext);

  const handleEditState = (state) => {
    setStateId(state._id);
    setFunfacts(Array.isArray(state.funfacts) ? state.funfacts : []);
    setImages(state.images || []);
    setModalVisible(true);
    editState(state);
  };
  
  // make the edit fun facts modal open
  const handleAdminPress = () => {
    setModalVisible(false);
  };
  
  // finish update a state fun fact
  const handleUpdateState = async () => {
    if (stateId) {
      try {
        const updatedData = {
          funfacts, 
          images: images,
          date: new Date().toISOString(),
        };
        await updateState(stateId, updatedData);
        setModalVisible(false);
        await fetchStates();
      } catch (error) {
        Alert.alert('Update Error', 'Failed to update the state info.');
        console.error('Update error:', error);
      }
    }
  };
  
  const handleDeleteFunFact = (index) => {
    Alert.alert(
        "Delete Fun Fact",
        "Are you sure you want to delete this fun fact?",
        [
            { text: "Cancel", style: "cancel" },
            { 
                text: "Delete", 
                onPress: () => setFunfacts(currentFunfacts => currentFunfacts.filter((_, i) => i !== index)) 
            }
        ]
    );
};



  const renderFunFactsInputs = () => {
    return funfacts.map((fact, index) => (
        <View key={index} style={styles.funFactContainer}>
            <TextInput
                style={styles.input}
                placeholder="Enter State's Fun Fact"
                value={fact}
                onChangeText={(text) => {
                    const updatedFunfacts = [...funfacts];
                    updatedFunfacts[index] = text;
                    setFunfacts(updatedFunfacts);
                }}
            />
            <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleDeleteFunFact(index)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    ));
};

  // check if the admin is authenticated and show Admin notifications screen
  const checkAdminAuth = async () => {
    try {
      const response = await fetch('https://statefunfactsmobileapp-0911da4049ba.herokuapp.com/admin/check-auth', {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); 
        
      } else {
        Alert.alert('Authentication Failed', 'You are not authorized to access this page.');
      }
    } catch (error) {
      console.error('Error checking admin authentication:', error);
      Alert.alert('Network Error', 'Unable to verify authentication.');
    }
  };

  useEffect(() => {
    checkAdminAuth();
  }, []);

  // below is the view to show the admin add state info component and the states' list component in one FlatList component
  return (
<SafeAreaView style={styles.screen}>
    
      <FlatList
        ListHeaderComponent={<AddState />}
        ListHeaderComponentStyle={styles.headerComponent}
        data={stateList}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <States
            stateCode={item.stateCode}
            funfacts={item.funfacts}
            date={item.date} 
            images={item.images}
            renderRightActions={() => (

              <View style = {styles.actionsContainer}>
                <TouchableWithoutFeedback onPress={() => handleEditState(item)}>                   
                  <View style={styles.pencilContainer}>
                    <MaterialCommunityIcons 
                      name="pencil"
                      size={40}
                      color="hsl(270, 50%, 60%)"
                    />                   
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => deleteState(item._id)}>                
                  <View style={styles.trashContainer}>
                    <MaterialCommunityIcons 
                      name="trash-can"
                      size={40}
                      color="hsl(270, 50%, 60%)"
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}  

          />

        )}
      
      />

        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Fun Fact</Text>
            {renderFunFactsInputs()}
            <TouchableOpacity style={styles.button} onPress={handleUpdateState}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAdminPress}>
              <Text style={styles.buttonText}>Admin</Text>
            </TouchableOpacity>
          </View>
        </Modal>
    
  </SafeAreaView>
  
  );

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.StatusBarHeight,
    backgroundColor: "#F7E7F8",
  },
  container: {
    padding: 20,
    paddingTop: 100,
  },
  secondContainer: {
    padding: 20,
    paddingTop: 50,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 7,
  },
  description: {
    color: "#fff",
    fontWeight: "bold",
  },
  actionsContainer: {
    width: 150,
    marginTop: 20,
    flexDirection: "column",
  },

  pencilContainer: {
    flex: 2,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 5,
    backgroundColor: "lavenderblush",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'hsl(270, 50%, 60%)',
    marginRight: "2%",

  },

  trashContainer: {
    flex: 2,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 5,
    backgroundColor: "#F8D7DA",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'hsl(270, 50%, 60%)',
    marginRight: "2%",
    marginBottom: "4%",
  },
  modalContent: {
    backgroundColor: "#F7E7F8",
    padding: 20,
    height: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 50,
    color: 'hsl(270, 50%, 60%)',
  },
  input: {
    borderWidth: 2,
    borderColor: "hsl(270, 50%, 60%)",
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    color: "hsl(270, 50%, 60%)",
    backgroundColor: "lavenderblush",
  },
  button: {
    backgroundColor: "lavenderblush",
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "hsl(270, 50%, 60%)",
    fontWeight: "bold",
    fontSize: 16,
  },
  headerComponent: {
    paddingTop: 13,
  },
  funFactContainer: {
    flexDirection: 'column', 
    marginBottom: 20,
    alignItems: 'stretch', 
  },
  deleteButton: {
    backgroundColor: 'hsl(270, 50%, 60%)',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },

});

export default AdminScreen; 