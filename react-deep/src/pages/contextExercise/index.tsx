import React, { useState } from 'react'
import User from './User'
import Todo from './Todo'

interface User {
  name: string
  age: number
}

export const UserContext = React.createContext<User>({name: '', age: 0})

export default () => {
  const [user, setUser] = useState<User>({ name: 'awefeng', age: 18 })
  return <>
    <UserContext.Provider value={user}>
      <User />
      <br />
      <Todo />
    </UserContext.Provider>
  </>
}
