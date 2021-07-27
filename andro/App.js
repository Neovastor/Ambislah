import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import HomeScreen from './screens/Home'
import GameScreen from './screens/Game'
import FinishScreen from './screens/Finish'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === 'Home') {
              iconName = focused ? 'home-outline' : 'home-outline';
            } else if (route.name === 'Game') {
              iconName = focused ? 'game-controller-outline' : 'game-controller-outline';
            } else if (route.name === 'Finish') {
              iconName = focused ? 'trophy-outline' : 'trophy-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Game" component={GameScreen} />
          <Tab.Screen name="Finish" component={FinishScreen} />
          {/* <Game /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}
