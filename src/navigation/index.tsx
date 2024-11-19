import React from 'react'
import { createStaticNavigation, RouteProp } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import QRCodeRegister from '../screens/QRCodeRegister'
import QRCodeReader from '../screens/QRCodeReader'

export type MainStackScreensParamList = {
  Register: undefined
  Reader: undefined
}

export type MainRouteProps<RouteName extends keyof MainStackScreensParamList> = RouteProp<
  MainStackScreensParamList,
  RouteName
>

const MainStack = createNativeStackNavigator({
  screens: {
    QRCodeReader: {
      screen: QRCodeReader,
      options: {
        title: 'Reader Screen',
      },
    },
    QRCodeRegister: {
      screen: QRCodeRegister,
      options: {
        title: 'Register Screen',
      },
    }
  },
});

const Navigation = createStaticNavigation(MainStack)

export default Navigation
