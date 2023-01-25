import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../AuthProvider'

export default function getContext() {
  const state = useContext(AuthContext);
  return state;
}