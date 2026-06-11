import {rootApi} from "./root.api.js";

export const userAllGetApi = async () =>{
    try{
        const response = await rootApi.get("/user")
        return response.data
    }catch(error){
        return error
    }
}

export const userLoginApi = async (userObj) => {
    try {
        const response = await rootApi.get(
            `/user?name=${userObj.name}`
        )

        const users = response.data

        if (!users.length) {
            throw new Error("존재하지 않는 사용자입니다.")
        }

        const loginUser = users[0]

        if (loginUser.password !== userObj.password) {
            throw new Error("비밀번호가 일치하지 않습니다.")
        }

        return loginUser

    } catch (error) {
        throw error
    }
}

export const userRegisterApi = async (userObj) => {
    try {
        const response = await rootApi.post(
            "/user",
            userObj
        )

        return response.data
    } catch (error) {
        throw error
    }
}



export const userPostApi = async (dataObj) =>{
    try{
        const response = await rootApi.get(`/user?name=${dataObj.name}`)
        const users = response.data
        if(users.length>0){
            return alert("이미 존재하는 사용자입니다.")
        } 
        return await rootApi.post(`/user`, dataObj)
        
    }catch(error){
        return error
    }
}

// export const userPutApi = async (dataObj) =>{
//     try{
//         const response = await rootApi.put("/user/${}", dataObj)
//         return response.data
//     }catch(error){
//         return error
//     }
// }

// export const userDeleteApi = async () =>{
//     try{
//         const response = await rootApi.delete("/user/2")
//         return response.data
//     }catch(error){
//         return error
//     }
// }