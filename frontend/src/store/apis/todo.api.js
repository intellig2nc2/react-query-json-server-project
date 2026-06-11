import {rootApi} from "./root.api.js";

export const todoAllGetApi = async () => {
  const response = await rootApi.get("/todos")
  return response.data
}

export const todoGetApi = async (id) => {
  const response = await rootApi.get(`/todos/${id}`)
  return response.data
}

export const todoPostApi = async (dataObj) => {
  const response = await rootApi.post(
    "/todos",
    dataObj
  )

  return response.data
}

export const todoPutApi = async (dataObj) => {
  const response = await rootApi.put(
    `/todos/${dataObj.id}`,
    dataObj
  )

  return response.data
}

export const todoDeleteApi = async (id) => {
  await rootApi.delete(`/todos/${id}`)
  return id
}