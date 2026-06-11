import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { userLoginApi, userRegisterApi } from "../apis/user.api"


export const userLoginSlice = createAsyncThunk(
    "userLoginSlice",
    async(userObj, thunkApi) => {
        try{
            const user = await userLoginApi(userObj)
            console.log("user",user)
            localStorage.setItem("user",JSON.stringify(user))
            return user
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const getUser = () =>{
    return JSON.parse(localStorage.getItem("user"))
}

export const userRegisterSlice = createAsyncThunk(
    "userRegisterSlice",
    async(userObj, thunkApi) => {
        try{
            const user = await userRegisterApi(userObj)
            return user
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const userLogoutSlice = createAsyncThunk(
    "userLogoutSlice",
    async(_, thunkApi) => {
        try{
            localStorage.removeItem("user")
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

// export const fetchUserTotalGet = createAsyncThunk(
//     "fetchUserTotalGet",
//     async (_, thunkApi) => {
//         try{
//             return await userTotalGetApi()
             
//         }catch(error){
//             return thunkApi.rejectWithValue(error.message)
//         }
//     }
// )



const initialUsers = [
    {id: 1, name: "john", password: "1111"},
    {id: 2, name: "peter", password: "1111"},
    {id: 3, name: "susan", password: "1111"},
    {id: 4, name: "sue", password: "1111"},
  ]
  const initialState = {
      userList: [],
      user: {},
      isLogin: false,
      loading: false,
      error: null,
  }

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers:{
        logout: (state) => {
            state.isLogin = false,
            state.name = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLoginSlice.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(userLoginSlice.fulfilled, (state, action) => {
                const user = getUser ();
                if(user.name === action.payload.name
                    && user.password === action.payload.password
                ){
                    state.isLogin = true
                    state.user = action.payload
                }
                state.loading = false
            })
            .addCase(userLoginSlice.rejected, (state, action) => {
                state.loading = false
                console.log("user", action.payload)
                state.error = action.payload
            })
            .addCase(userRegisterSlice.fulfilled, (state, action) => {
                state.userList = [...state.userList, action.payload]
                state.isLogin = false
                state.loading = false
            })
            .addCase(userLogoutSlice.fulfilled, (state, action) => {
                state.user = {}
                state.isLogin = false
                state.loading = false
                state.error = null
            })
    }
})

 export const {login, register, logout} = userSlice.actions;
 export default userSlice.reducer;