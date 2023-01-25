import React, { createContext, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { NativeBaseProvider, Box } from "native-base";
import Homepage from './components/Homepage';
import ReportMissing from './components/ReportMissing';
import ReportFound from './components/ReportFound';
import Request from './components/Request';
import ViewMissingPerson from './components/ViewMissingPerson';
import ViewFoundPerson from './components/ViewFoundPerson';
import { AuthProvider } from './AuthProvider';
import { Provider } from 'react-redux';
import { store } from './store';



export default function App() {
  const Stack = createStackNavigator();

  



  return (
    
      <NativeBaseProvider>
      <SafeAreaView style={style.AndroidSafeArea}>
        <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginPage} options={{headerShown:false}} />
            <Stack.Screen name="Homepage" component={Homepage} options={{headerShown:false}} />
            <Stack.Screen name="Missing" component={ReportMissing} options={{headerShown:false}} />
            <Stack.Screen name="Found" component={ReportFound} options={{headerShown:false}} />
            <Stack.Screen name="Request" component={Request} options={{headerShown:false}} />
            <Stack.Screen name="MissingRequest" component={ViewMissingPerson} options={{headerShown:false}} />
            <Stack.Screen name="FoundRequest" component={ViewFoundPerson} options={{headerShown:false}} />
            <Stack.Screen name="Register" component={RegisterPage} options={{headerShown:false}} />
          </Stack.Navigator>
        </NavigationContainer>
        </AuthProvider>
        </Provider>
      </SafeAreaView>
      </NativeBaseProvider>
    
  );
}

const style = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
