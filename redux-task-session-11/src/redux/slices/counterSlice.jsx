import { createSlice } from '@reduxjs/toolkit'



const loadStateFromLocalStorage = () => {
    try {
      const savedState = localStorage.getItem('names');
      return savedState ? JSON.parse(savedState) : [];
    } catch (error) {
    console.log(error);
    return [];  
    }
  };

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    names: loadStateFromLocalStorage(),
  },
  reducers: {

    addnewName:( state, action )=> {
        console.log(action, "uytuyuyuyuyuyu");
        
        state.names.push(action.payload); 
        localStorage.setItem('names', JSON.stringify(state.names));
    },
    removeNames: (state, action) => {
        console.log(action);
        
        state.names = state.names.filter((name) => name.id !== action.payload.id )
        localStorage.setItem('names', JSON.stringify(state.names));
    },
    updateName: (state, action) => {
        console.log("opopopopop", action);
        
        const { id, name } = action.payload;
        const todo = state.names.find((todo) => todo.id === id);
        if (todo) {
            todo.name = name;
            localStorage.setItem('names', JSON.stringify(state.names));
        }
    }
  }
})

export const { addnewName, removeNames, updateName } = counterSlice.actions

export default counterSlice.reducer