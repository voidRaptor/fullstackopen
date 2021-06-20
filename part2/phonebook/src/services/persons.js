import axios from 'axios'


const baseUrl = "http://localhost:3001/persons"


const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}


const create = newObj => {
  const req = axios.post(baseUrl, newObj)
  return req.then(res => res.data)
}


const update = (id, newObj) => {
  const req = axios.put(`${baseUrl}/${id}`, newObj)
  return req.then(res => res.data)
}


const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(res => res.data)
}


const exported = { getAll, create, update, remove }
export default exported;
