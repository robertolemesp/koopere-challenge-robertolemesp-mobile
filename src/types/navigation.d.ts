import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
  Register: undefined
  Reader: undefined
}

export type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>

export type ReaderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Reader'
>
