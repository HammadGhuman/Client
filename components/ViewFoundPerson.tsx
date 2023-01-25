import { Avatar, Box, Button, FlatList, Heading, HStack, Spacer, Text, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useApproveRequestMutation, useDeleteRequestMutation, useFoundRequestMutation, usePendingRequestMutation } from '../store/api/authApi';
import { getInfoAsync } from 'expo-file-system';
const ViewFoundPerson = () => {
    const [pendingRequest,{data,error,isSuccess}] = useFoundRequestMutation();
    // const [approveRequest,aprovData] = useApproveRequestMutation();
    // const [deleteRequest,delData] = useDeleteRequestMutation();
    // console.log('aprove data',aprovData.data);
    const [err,setErr] = useState(false);
    const fetchData = async()=>{
        try {
            const payload = await pendingRequest({}).unwrap();
            console.log('fulfilled', payload)
            if(payload.length === 0){
                setErr(true);
            }
          } catch (error) {
            console.error('rejected', error);
          }
    }
   
    useEffect(()=>{
        fetchData();
    },[])
    
    return (<Box>
    <Heading fontSize="xl" p="4" pb="3">
      Found Persons
    </Heading>
    <FlatList data={data} renderItem={({
    item
  }) => <Box borderBottomWidth="1" _dark={{
    borderColor: "muted.50"
  }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
          <HStack space={[2, 3]} justifyContent="space-between">
            <Avatar size="xl" source={{
        uri: item.imageOfChild
      }} />
            <VStack>
              <Text _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" bold>
                {item.ChildName}
              </Text>
              <Text color="coolGray.600" _dark={{
          color: "warmGray.200"
        }}>
                {item.age}
              </Text>
              <Text color="coolGray.600" _dark={{
          color: "warmGray.200"
        }}>
                {item.LocationOfChild}
              </Text>
              <Text color="coolGray.600" _dark={{
          color: "warmGray.200"
        }}>
                {item.descriptionOfChild}
              </Text>
            </VStack>
            <Spacer />
          </HStack>
        </Box>} keyExtractor={item => item.id} />
  </Box>);
}

export default ViewFoundPerson