import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Color } from '../customTypes/colors'

const CustomSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={Color.ACCENT} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 15,
    paddingHorizontal: '1%',
    paddingVertical: '1%',
    backgroundColor: Color.BACKGROUND3,
    borderRadius: 50,
  }
})

export default CustomSpinner