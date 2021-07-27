import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableHighlight, Button, Alert, Image } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import tailwind from 'tailwind-rn';
import Animated from 'react-native-reanimated'
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { Asset } from 'expo-asset'
import { AppLoading } from 'expo'

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const Separator = () => (
  <View style={styles.separator} />
);

export default function Home({ navigation }) {
  const { register, handleSubmit } = useForm();
   
  return (
    <SafeAreaView style={tailwind('h-full')}>
		<View style={tailwind('pt-12 items-center bg-red-600 min-h-full')}>
			<View style={tailwind('bg-red-600 px-3 py-1 rounded-full max-w-full')}>
        {/* <Image 
          source={require('../assets/pertama.gif')}
          style={{ flex: 1, height: null, width: null }}
        />   */}
				<Text style={tailwind('text-blue-800 font-semibold max-w-full')}>
					Android Tailwind
				</Text>

          <View >
            <View
              style={tailwind('mb-4 flex flex-row justify-center max-w-full')}
              // className="m-4 flex justify-center "
              // onSubmit={(e) => handleOnSubmit(e)}
              >
              
              <TextInput
                style={tailwind('px-4 py-2 rounded-full  text-gray-800 border-gray-200 bg-white')}
                placeholder="input pin"
                // onChange={(e) => onChangeHandlerRoomkey(e)}
                />

            </View>
            <View
              style={tailwind('mb-4 flex flex-row justify-center max-w-full')}
              // className="m-4 flex justify-center "
              // onSubmit={(e) => handleOnSubmit(e)}
              >
              
              <TextInput
                style={tailwind('px-4 py-2 rounded-full  text-gray-800 border-gray-200 bg-white')}
                placeholder="nickname"
                // onChange={(e) => onChangeHandlerPlayername(e)}
              />

            </View>
            <TouchableHighlight 
              // onPress={onPress}
              >
              <View style={tailwind('mt-4 px-4 py-2 rounded-full bg-yellow-400 text-center text-gray-800 font-bold uppercase border-yellow-500 ')}>
                <Text>Join</Text>
              </View>
            </TouchableHighlight>
          </View>

			</View>
		</View>
	</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    marginVertical: 0,
    backgroundColor: '#96BAFF'
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  score: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});