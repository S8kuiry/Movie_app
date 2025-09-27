import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const saved = () => {
  return (
    <View className="flex-1 bg-primary px-6">
         <View className="w-full h-full flex flex-col items-center justify-center gap-3">
           <Image source={icons.save} tintColor={"#9e7dedff"} style={{height: 30,}}></Image>
           <Text style={{color:'rgba(138, 110, 224, 0.99)',fontSize:14}} className="text-pink-200 mt-4 font-normal text-sm">Saved</Text>
         </View>
       </View>
  )
}

export default saved