import { View ,StyleSheet,TouchableHighlight, Pressable, TouchableOpacity } from 'react-native';
import React,{useContext, useEffect, useState} from 'react'
import { Formik } from 'formik';
import {Box,Input, Stack,Button,Text, Heading, Toast} from 'native-base'
import {useLoginMutation } from '../store/api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthProvider';



const LoginPage = ({navigation}:any) => {
  const [Login,{error,data,isSuccess}] = useLoginMutation();
  
    const setData = async ()=>{
      try{
        await AsyncStorage.setItem('token',data.access_token);
      }
      catch(er){
        console.log(er);
      }
    }
    if(isSuccess){
      const { auth, login } = useContext(AuthContext);
      login(data.access_token,data.email,data.fullName,data.type);
      setData()
      navigation.replace('Homepage')
    }

 
  return (
    <Formik
     initialValues={{ email: '' ,password:''}}
     onSubmit={async(values)=>{
      
      if(values.email === '' || values.password === ''){
        Toast.show({
          title:"Error",
          description:"All Fields are Required",
          placement:"top",
          backgroundColor:"red.500",
          color:"white",
          paddingX:"4"
        })
      }else{ 
        const res = await Login({...values});
        console.log(values);
        console.log(isSuccess)
      }
     }}
   >
      {({handleChange,handleBlur,handleSubmit,values})=>(

        <Box alignItems="center" justifyContent="center" minHeight="100%">
        <Stack minW="100%" px="5" alignItems="center" space="5">
          <Heading color="red.600"> Missing Children</Heading>
          <Heading > LoginPage</Heading>
          <Input variant="outline" placeholder="Email"  value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')}/>
          <Input variant="outline" placeholder="Password"  onChangeText={handleChange("password")} value={values.password} onBlur={handleBlur('password')}/>
          <TouchableOpacity onPress={()=>console.log("hammad")}>
          <Button  size="sm"  variant="subtle" px="5" py="2"  _light={{backgroundColor:"danger.500"}} onPress={()=>handleSubmit()}>
           <Text fontSize="2xl" paddingX={90}>Login</Text>
          </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.replace("Register");console.log("hello")}}>
            <Text fontSize="md">Dont have an account? 
                <Text fontWeight="bold" color={"success.500"}> Register</Text>
            </Text>
            </TouchableOpacity>
        </Stack>
        </Box>


      )}
    </Formik>
  )
}

export default LoginPage