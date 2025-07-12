import { createSlice } from "@reduxjs/toolkit";

const NoteHanlder = createSlice({
    name:"note",
    initialState:{token:""},
    reducers:{
        addToken(state,action){
            state.token = action.payload
        }
    }
})

export const {addToken} = NoteHanlder.actions
export default NoteHanlder.reducer