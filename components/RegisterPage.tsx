import {StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native'
import React,{useState} from 'react'
import { Formik } from 'formik';
import {Box,Input, Stack,Button,Text, Heading, Toast, Alert, ScrollView} from 'native-base'
import { useRegisterMutation } from '../store/api/authApi';
type Props = {
    navigation:any
}

type Response = {
  data: Data;
  status: number;
}
type Data = {
  error: string;
  message: string;
  statusCode: number;
}


const RegisterPage = ({navigation}: Props) => {
  const [Register,{data,error,isLoading,isError,isSuccess}] = useRegisterMutation();
  const [err,setErr] = useState<Response|null>(null);
  console.log("isError = ",isError,error);
  console.log("response = ",data);
  console.log("Loading = ",isLoading)

  return (
    <Formik
     initialValues={{ email: '' ,password:'' ,fullName:'',rePassword:''}}
     onSubmit={async(values)=>{
      console.log(values);
      if(values.email === '' || values.password === ''||values.fullName === ''){
        Toast.show({
          title:"Error",
          description:"All Fields are Required",
          placement:"top",
          backgroundColor:"red.500",
          color:"white",
          paddingX:"4"
        })
      }else{ 
        Register({...values});
        if(isError){
          setErr((error as Response));
          console.log('Err' , err);
        }
      }
     }}
   >
      {({handleChange,handleBlur,handleSubmit,values})=>(
        <Box alignItems="center" justifyContent="center" minHeight="100%">
        <Stack minW="100%" px="5" alignItems="center" space="5">
          <Heading color="red.600"> Missing Children</Heading>
          <Heading >Registration Form</Heading>
          {isError && (<Alert color={'red.500'} variant="subtle" bgColor={"red.500"} _text={{color:"white"}} width="full" fontWeight="bold">{(error as any).data.message}</Alert>)}
          {isSuccess && (<Alert color={'success.500'} variant="subtle" bgColor={"success.500"} _text={{color:"white"}} width="full" fontWeight="bold">Account Created Successfully</Alert>)}
          <Input variant="outline" placeholder="Enter Your Full Name"  value={values.fullName} onChangeText={handleChange('fullName')} onBlur={handleBlur('fullName')}/>
          <Input variant="outline" placeholder="Etner Your Email"  onChangeText={handleChange("email")} value={values.email} onBlur={handleBlur('email')}/>
          <Input variant="outline" placeholder="Enter Your Password"  value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')}/>
          <Input variant="outline" placeholder="Enter Your Password Again"  onChangeText={handleChange("rePassword")} value={values.rePassword} onBlur={handleBlur('rePassword')}/>
          <TouchableOpacity disabled={isLoading} onPress={()=>handleSubmit()}>
          <Button  size="sm"  variant="subtle" px="5" py="2" disabled={true} isLoading={isLoading} isLoadingText='Register'  _light={{backgroundColor:"danger.500"}} >
           <Text fontSize="2xl" paddingX={90}>Register</Text>
          </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Text fontSize="md">Already have an account? 
                <Text fontWeight="bold" color={"success.500"}> Sign In</Text>
            </Text>
            </TouchableOpacity>
        </Stack>
        </Box>
      )}
    </Formik>
  )
}

const style = StyleSheet.create({
  main:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    minHeight:"100%"
  },
    Container:{
      paddingHorizontal:10, 
      color:"#333",
      fontSize:30,
      textAlign:'center',
      fontWeight:'bold',
      marginVertical:10
    },
    Card:{
      display:"flex",
      flexDirection:"column",
      borderWidth:1,
      marginHorizontal:20,
      backgroundColor:"#aaa",
      marginTop:10,
      paddingVertical:50,
      borderRadius:10,
    },
    button:{
      width:"50%",
      paddingHorizontal:20,
      paddingVertical:15,
      borderRadius:10,
      backgroundColor:"#333",
      marginRight : 'auto',
      marginLeft: 'auto',
    },
    buttonText:{
      fontSize : 20,
      textAlign:'center',
      fontWeight:'bold',
      color:'#fff'
    },
    linkText:{
      color:'#333'
    }
  })

export default RegisterPage