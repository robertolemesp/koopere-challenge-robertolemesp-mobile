import React from 'react'
import { Text, StyleSheet, TextProps, TextStyle } from 'react-native'

type TypographyVariant = 'h1' | 'h2' | 'body' | 'caption'

interface TypographyProps extends TextProps {
  variant?: TypographyVariant
  style?: TextStyle | TextStyle[]
  children: React.ReactNode
}

const Typography: React.FC<TypographyProps> = ({ variant = 'body', style, children, ...props }) => {
  const textStyle = [styles[variant], style]
  return <Text style={textStyle} {...props}>
    {children}
  </Text>
  
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  body: {
    fontSize: 16,
    color: '#333',
  },
  caption: {
    fontSize: 12,
    color: '#666',
  }
})

export default Typography
