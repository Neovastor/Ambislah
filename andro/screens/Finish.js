import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Button, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const Separator = () => (
  <View style={styles.separator} />
);

export default function Finish({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.tulisanatas}>
        SUDOKU GAME
      </Text>
    <Separator />
      <View style={styles.layouting}>
        <Text style={styles.tulisan}>
          Welcome to Sudoku
        </Text>
        <TextInput style={styles.welcome}
        // onChangeText={(val) => setPlayer(val)}
        // value={player}
        placeholderTextColor="lightgrey"
        placeholder='Input Your Name'
        editable
        >
      </TextInput>
      <Picker style={styles.select}
        // onValueChange={(val) => setLevel(val)}
        mode={'dropdown'}
        // selectedValue={ level }
        >
        <Picker.Item value="" label="Level"  enabled={false}/>
        <Picker.Item  value="hard" label="Hard" />
        <Picker.Item value="medium" label="Medium"  />
        <Picker.Item value="easy" label="Easy"  />
      </Picker>

      </View>
          <Button
            title="Go to Game"
            // onPress={ goToGame }
          />
    </View>
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
  layouting: {
    backgroundColor: 'purple',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 75,
    marginBottom: 40,
    paddingLeft: 35,
    paddingRight: 35,
    marginTop: 10,
    padding: 5,
    borderWidth: 1,
    color: 'white',
    width: '80%',
  },  
  select: {
    marginBottom: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 4,
    paddingRight: 4,
    color: 'white',
    width: '55%',
  },
  tulisanatas: {
    textAlign:'center',
    backgroundColor: 'red', 
    borderRadius: 99,
    paddingRight: 25,
    paddingLeft: 25,
    paddingBottom: 25,
    paddingTop: 25,
    color: 'white', 
    borderBottomColor: 'lightgrey', 
    fontWeight: 'bold',
    padding: 15, 
    marginBottom: 7, 
    borderBottomWidth: StyleSheet.hairlineWidth, 
  },
  tulisan: {
    textAlign:'center',
    backgroundColor: 'blue', 
    borderRadius: 99,
    marginLeft: 21,
    marginRight: 21,
    color: 'white', 
    borderBottomColor: 'lightgrey', 
    fontWeight: 'bold',
    padding: 11, 
    marginBottom: 7, 
    borderBottomWidth: StyleSheet.hairlineWidth, 
  },
  welcome: {
    marginTop: 7,
    marginBottom: 25,
    marginLeft: 7,
    height: 35,
    color: 'white',
    borderBottomColor: 'lightgrey',
    width: '95%',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});