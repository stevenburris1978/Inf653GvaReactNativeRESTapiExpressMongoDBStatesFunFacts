import { useState, useEffect, createContext } from "react";
import { Alert } from "react-native";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [stateList, setStateList] = useState([]);
  const [stateEdit, setStateEdit] = useState({
    state: {},
    edit: false,
  });

  // Fetch state info from the backend
  const fetchStates = async () => {
    try {
      const response = await fetch('https://statefunfactsmobileapp-0911da4049ba.herokuapp.com/states');
      const data = await response.json();
      if (response.ok) {
        setStateList(data);
      } else {
        console.error('Error fetching state info:', data);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  // Add New state info
  const addState = async (newItem) => {
    try {
      // Check if the state info already exists
      const existingState = stateList.find(state => state.stateCode === newItem.stateCode);
      if (existingState) {
        const updatedState = {
          ...existingState,
          funfacts: [...existingState.funfacts, newItem.funfacts].flat(), 
          images: [...existingState.images, ...newItem.images], 
          date: newItem.date, 
        };
        await updateState(existingState._id, updatedState); 
      } else {
        // Add new state info
        const response = await fetch('https://statefunfactsmobileapp-0911da4049ba.herokuapp.com/states', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        });
        if (response.ok) {
          const addedState = await response.json();
          setStateList(prevStates => [...prevStates, addedState]);
        } else {
          console.error('Error adding state info:', await response.json());
        }
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };  

  // Delete state info
  const deleteState = (_id) => {
    Alert.alert(
      "Delete State Info",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await fetch(`https://statefunfactsmobileapp-0911da4049ba.herokuapp.com/states/${_id}`, {
                method: 'DELETE',
              });
              if (response.ok) {
                fetchStates(); 
              } else {
                
                console.error('Error deleting item:', await response.json());
              }
            } catch (error) {
              console.error('Network error:', error);
            }
          },
        },
      ],
    );
  };

  // Edit State info
  const editState = (state) => {
    setStateEdit({ state, edit: true });
  };

  // Update State info
  const updateState = async (_id, updState) => {
    try {
        const response = await fetch(`https://statefunfactsmobileapp-0911da4049ba.herokuapp.com/states/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updState),
        });

        const updatedState = await response.json();
        if (!response.ok) {
            throw new Error(updatedState.message || "Error updating state info.");
        }

        // Update local state list
        setStateList(prevStateList => prevStateList.map(state => 
            state._id === _id ? { ...state, ...updatedState } : state
        ));
    } catch (error) {
        console.error('Network error:', error);
        throw error;
    }
};


  return (
    <TaskContext.Provider
      value={{ stateList, addState, editState, updateState, deleteState, stateEdit, fetchStates }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;