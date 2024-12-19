import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    email: "",
    profile: "",
    token: "",
    onlineUser:[],
    socketConnection:null
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.profile = action.payload.profile
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        logout: (state, action) => {
            state._id = ""
            state.name = ""
            state.email = ""
            state.profile = ""
            state.token = ""
            state.socketConnection=""
        },
        setOnlineUser:(state,action)=>{
            state.onlineUser=action.payload
        },
        setSocketConnection:(state,action)=>{
            state.socketConnection=action.payload
        }

    }
})

export const { setToken, setUser, logout,setOnlineUser,setSocketConnection } = userReducer.actions
export default userReducer.reducer