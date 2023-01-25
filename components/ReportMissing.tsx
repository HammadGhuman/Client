import {
  Box,
  Text,
  FormControl,
  Stack,
  Input,
  WarningOutlineIcon,
  VStack,
  Heading,
  Button,
  Avatar,
  Radio,
  HStack,
  Toast,
} from "native-base";

import React, { useState } from "react";
import { TouchableOpacity, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import { useReportMissingMutation } from "../store/api/authApi";

const ReportMissing = ({navigation}) => {
  const [pic, SetPic] = useState<any>(null);
  const [fileType, setFileType] = useState<any>(null);
  const [fileName, setFileName] = useState<any>(null);
  
  const upload = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      SetPic(result.assets[0].uri);
      setFileType(result.assets[0].type);
      
    }
  };
  const [useMissing, { data, isLoading, isSuccess, isError, error }] =
    useReportMissingMutation();
  const [gen, setGen] = useState("Male");
  console.log("///////////Report Missing////////////");
  console.log("Data = ", data);
  if(isSuccess){
    navigation.goBack()
  }
  console.log("isError = ", isError);
  console.log("Error = ", error);
  return (
    <Formik
      initialValues={{
        childName: "",
        age: "",
        email: "",
        contact: "",
        location: "",
        description: "",
      }}
      onSubmit={async (values) => {
        console.log({ ...values, gen });
        const formData = new FormData();
        formData.append('ChildName',values.childName);
        formData.append('age',values.age);
        formData.append('email',values.email);
        formData.append('contactNumber',values.contact);
        formData.append('LocationOfChild',values.location);
        formData.append('descriptionOfChild',values.description);
        formData.append('gender',gen);
        console.log('file type ======== ',`${fileType}/${pic.split('.')[3]} ============ ${fileName}`);
        
        formData.append('file',{
          name: 'jammad',
          type : `${fileType}/${pic.split('.')[3]}`,
          uri: Platform.OS === 'ios' ?
           pic.replace('file://', '')
           : pic,
        })

        useMissing(formData);
      }}
    >
      {({ handleSubmit, handleChange, handleBlur, values }) => (
        <ScrollView>
          <Box marginY={"5"}>
            <VStack
              mt={"4"}
              px={"3"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Heading>Report A Missing Children</Heading>
            </VStack>
            <VStack space={"4"}>
              <FormControl isRequired>
                <Stack mx="4">
                  <FormControl.Label>Child Name</FormControl.Label>
                  <Input
                    onChangeText={handleChange("childName")}
                    onBlur={handleBlur("childName")}
                    value={values.childName}
                    type="text"
                    defaultValue="Muhammad Ali"
                    placeholder="Eg : Muhhammad ALi"
                  />
                </Stack>
              </FormControl>
              <FormControl isRequired>
                <Stack mx="4">
                  <FormControl.Label>Age</FormControl.Label>
                  <Input
                    keyboardType="numeric"
                    onChangeText={handleChange("age")}
                    onBlur={handleBlur("age")}
                    value={values.age}
                    type="text"
                    defaultValue="18"
                    placeholder="Eg : 12"
                  />
                </Stack>
              </FormControl>
              <FormControl isRequired>
                <Stack mx="4">
                  <FormControl.Label>Gender</FormControl.Label>
                  <Radio.Group
                    name="myRadioGroup"
                    value={gen}
                    onChange={(nextValue) => {
                      setGen(nextValue);
                    }}
                  >
                    <HStack space="10">
                      <Radio value="Male" my="1">
                        Male
                      </Radio>
                      <Radio value="Female" my="1">
                        Female
                      </Radio>
                    </HStack>
                  </Radio.Group>
                </Stack>
              </FormControl>
              <FormControl isRequired>
                <Stack mx="4">
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    type="text"
                    defaultValue="test@gmail.com"
                    placeholder="Eg : Test@gmail.com"
                  />
                </Stack>
              </FormControl>
              <FormControl isRequired>
                <Stack mx="4">
                  <FormControl.Label>Contact Phn no.</FormControl.Label>
                  <Input
                    keyboardType="numeric"
                    onChangeText={handleChange("contact")}
                    onBlur={handleBlur("contact")}
                    value={values.contact}
                    type="text"
                    defaultValue="0xxx0xxxx"
                    placeholder="Eg : 03xx4xx4xxx"
                  />
                </Stack>
              </FormControl>
              <FormControl isRequired>
                <Stack mx="4">
                  <FormControl.Label>Location of Child</FormControl.Label>
                  <Input
                    onChangeText={handleChange("location")}
                    onBlur={handleBlur("location")}
                    value={values.location}
                    type="text"
                    defaultValue="0xxx0xxxx"
                    placeholder="Eg : Gulsahn near optp"
                  />
                </Stack>
              </FormControl>
              <FormControl isRequired>
                <Stack mx="4">
                  <FormControl.Label>Description</FormControl.Label>
                  <Input
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                    type="text"
                    defaultValue="0xxx0xxxx"
                    placeholder="Eg : Mid Age short hight black Person"
                  />
                </Stack>
              </FormControl>
              {pic && (
                <Box alignItems={"center"}>
                  <Image
                    source={{ uri: pic }}
                    style={{ width: 200, height: 200 }}
                  />
                </Box>
              )}
              {!pic && (
                <Button
                  onPressOut={() => upload()}
                  backgroundColor={"blue.500"}
                  mx={4}
                  onPress={() => upload()}
                >
                  <Text>Upload Image</Text>
                </Button>
              )}
              {pic && (
                <Button.Group
                  isAttached
                  colorScheme="darkBlue"
                  mx={{
                    base: "auto",
                    // md: 0
                  }}
                >
                  <Button onPressOut={() => upload()} width="45%">
                    Change Image
                  </Button>
                  <Button
                    onPress={() => handleSubmit()}
                    width="45%"
                    variant="outline"
                  >
                    Report
                  </Button>
                </Button.Group>
              )}
            </VStack>
          </Box>
        </ScrollView>
      )}
    </Formik>
  );
};

export default ReportMissing;
