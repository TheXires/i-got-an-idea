import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const test = () => {
  const [apiData, setApiData] = useState();

  useEffect(() => {
    async function fetchApiData(){
      let data = await dasWasDirDasPromiseObjektZurückgibt();
      setApiData(data);
    }
    fetchApiData();
  }, [apiData])

  return (
    <View>
      {apiData !== undefined && weitereBedingungen ? (
          <Text>apiData.inhalt</Text>
        ) : (
          <Text>Loadagin</Text>
        )
      }
    </View>
  )
}

export default test

