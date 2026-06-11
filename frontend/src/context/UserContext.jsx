import React, { createContext, useReducer } from 'react'

export const UserContext = createContext(); 

const initialUsers = [
  {id: 1, name: "john", password: "1111"},
  {id: 2, name: "peter", password: "1111"},
  {id: 3, name: "susan", password: "1111"},
  {id: 4, name: "sue", password: "1111"},
]
const initalState = {
    users: initialUsers,
    name: '',
    isLogin: false
}
const reducer = (state, action)=>{
  switch(action.type){
    case "login":
      return{
        ...state,
        username: action.payload.name,
        isLogin: true
      }
    case "register":
      return {
        ...state,
        users: [
          ...state.users,
          {
            id: action.payload.id,
            username: action.payload.user.name,
            password: action.payload.user.password
          }
        ]
      }
    case "logout":
      return {
        ...state,
        isLogin: false,
        name: ""
      }
    default:
      return state;
  }

}

const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
