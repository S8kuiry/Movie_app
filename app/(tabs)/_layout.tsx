import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

const _layout = () => {
  const TabIcon = ({ focused, icon, title }: any) => (
    focused ? (
      <ImageBackground source={images.highlight} className='flex flex-row items-center justify-center   w-full flex-1 min-w-[110px] 
        mt-4 min-h-14 overflow-hidden rounded-full'>
        <Image source={icon} tintColor={'#141414ff'} className='size-5'></Image>
        <Text className='mx-1 font-semibold text-secondary '>{title}</Text>


      </ImageBackground>
    ) : (<View className='flex flex-row items-center justify-center   w-full flex-1 min-w-[110px] 
        mt-4 min-h-14 overflow-hidden rounded-full'>
      <Image source={icon} tintColor={'#fcf8f5ff'} className='size-5'></Image>


    </View>)


  )
  return (
    <Tabs screenOptions={{
      headerShown: false, // ✅ hides back arrow + headers everywhere
      tabBarShowLabel: false,
      tabBarItemStyle: {
        justifyContent: "center",
        alignItems: "center",

      },// ✅ we’re using custom text inside TabIcon
      tabBarStyle: {
        backgroundColor: "#130229ff",
        borderTopWidth: 0,
        borderRadius: 50,
        height: 52,

        marginHorizontal: 20,
        position: 'absolute',
        bottom: 15,          // ✅ floating above bottom

        paddingHorizontal: 8,
        marginBottom: 16
      },
    }} >
      <Tabs.Screen name='index' options={{
        title: 'Home', headerShown: false, tabBarIcon: ({ focused }) => (


          <TabIcon focused={focused} icon={icons.home} title={'Home'} />


        )
      }} />
       <Tabs.Screen name='search' options={{
        title: 'Search', headerShown: false, tabBarIcon: ({ focused }) => (
          <>

            <TabIcon focused={focused} icon={icons.search} title={'Search'} />

          </>
        )
      }} />
      <Tabs.Screen name='saved' options={{
        title: 'Saved', headerShown: false, tabBarIcon: ({ focused }) => (
          <>

            <TabIcon focused={focused} icon={icons.save} title={'Saved'} />

          </>
        )
      }} />
     
      <Tabs.Screen name='profile' options={{
        title: 'Profile', headerShown: false, tabBarIcon: ({ focused }) => (
          <>

            <TabIcon focused={focused} icon={icons.person} title={'Profile'} />

          </>
        )
      }} />



    </Tabs>
  )
}

export default _layout