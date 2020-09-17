import React, { useContext } from 'react'
import { UserContext } from './index'

export default () => {
  const user = useContext(UserContext)
  return <>
    Todo Say - name : {user.name}
  Todo Say - age : {user.age}
  </>
}
