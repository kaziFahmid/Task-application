import React, { useContext } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider'


const useAuth = () => {
const {user}=useContext(AuthContext)
  return useContext(AuthContext)
}

export default useAuth
