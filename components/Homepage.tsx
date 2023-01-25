import { Avatar, Box, Heading, HStack, Image, ScrollView, Text, VStack,Button } from "native-base";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import MissingChild from "../assets/favicon.png";
import { AuthContext } from "../AuthProvider";
import { useAppSelector } from "../store/hooks";

const Homepage = ({navigation}:any) => {
  const state = useContext(AuthContext);
  console.log("------------------access_token---------------",state);
  return state.auth.token ? (    <Box>
    <HStack
      p={4}
      shadow={9}
      backgroundColor={"gray.100"}
      space={3}
      alignItems="center"
    >
      <Avatar>
        <Image source={MissingChild} alt="Avatar"></Image>
      </Avatar>
      <VStack>
      <Heading>{state.auth.fullName}</Heading>
      <Text>{state.auth.email}</Text>
      </VStack>
      <Button backgroundColor={'red.500'} ml={'7'} onPress={()=>{
        state.logout();
        navigation.replace('Login');
      }}>Logout</Button>
    </HStack>
    <ScrollView>
    <VStack space={10} mt={5} py={5} alignItems={"center"} justifyContent="center">
      <VStack space={10}>
        <TouchableOpacity onPress={()=>navigation.navigate("Missing")}>
          <Box
            shadow={"9"}
            px="5"
            py="5"
            background={"gray.100"}
            rounded={"2xl"}
          >
            <HStack space={10} alignItems="center">
              <Avatar>
                <Image source={MissingChild} alt="avatar"></Image>
              </Avatar>
              <Heading>Report A Missing Person</Heading>
            </HStack>
          </Box>
        </TouchableOpacity>
        {state.auth.type === 'admin' && (
          <>
          <TouchableOpacity onPress={()=>navigation.navigate("Found")}>
          <Box
            shadow={"9"}
            px="5"
            py="5"
            background={"gray.100"}
            rounded={"2xl"}
          >
            <HStack width={"100%"} space={10} alignItems="center">
              <Avatar>
                <Image source={MissingChild} alt="avatar"></Image>
              </Avatar>
              <Heading>Report A Found Person</Heading>
            </HStack>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Request")}>
          <Box
            shadow={"9"}
            px="5"
            py="5"
            background={"gray.100"}
            rounded={"2xl"}
          >
            <HStack width={"100%"} space={10} alignItems="center">
              <Avatar>
                <Image source={MissingChild} alt="avatar"></Image>
              </Avatar>
              <Heading>View Pending Requests</Heading>
            </HStack>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("MissingRequest")}>
          <Box
            shadow={"9"}
            px="5"
            py="5"
            background={"gray.100"}
            rounded={"2xl"}
          >
            <HStack width={"100%"} space={10} alignItems="center">
              <Avatar>
                <Image source={MissingChild} alt="avatar"></Image>
              </Avatar>
              <Heading>View Missing Persons</Heading>
            </HStack>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("FoundRequest")}>
          <Box
            shadow={"9"}
            px="5"
            py="5"
            background={"gray.100"}
            rounded={"2xl"}
          >
            <HStack width={"100%"} space={10} alignItems="center">
              <Avatar>
                <Image source={MissingChild} alt="avatar"></Image>
              </Avatar>
              <Heading>View Found Persons</Heading>
            </HStack>
          </Box>
        </TouchableOpacity>
</>
        )}
        </VStack>
    </VStack >
    </ScrollView>
  </Box>) :
   (<Box>
    Error
   </Box>) 

};

export default Homepage;
