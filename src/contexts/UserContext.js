import React, { Component } from 'react'
// import AuthApiService from '../services/auth-api-service'
// import TokenService from '../services/token-service'
// import IdleService from '../services/idle-service'

const UserContext = React.createContext({
  user: {},
  error: null,
})

export default UserContext