import React, { useContext } from 'react'
import { UserContext } from './index'
const User = () => {
  return <UserContext.Consumer>{user => {
    return <>
      <b>姓名：{user.name}</b>
      <br />
      <b>年龄：{user.age}</b>
    </>
  }}</UserContext.Consumer>
}

export default User
