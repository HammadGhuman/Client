import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import getContext from './getContext';
// Define a service using a base URL and expected endpoints


const getData =async()=>{
  const token = await AsyncStorage.getItem('token');
  return token;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://7703-182-182-15-187.in.ngrok.io',prepareHeaders: async (headers, { getState }) => {
        console.log('heloo')
        const data = await getData();
        console.log('token ==========',data);
        headers.set('authorization', `Bearer ${`${data}`}`)
       return headers;
  }}),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body)=>{
        return{
            url:'users/login',
            method:'POST',
            body,
        }
      }
    }),
    register:builder.mutation({
      query : (body) => {
        return {
          url:'users/register',
          method:'post',
          body
        }
      }
    }),
    reportMissing:builder.mutation({
      query: (body) => {
        console.log("Auth Api Missing Request");
        console.log(body);
        
        return {
          url :'uploads/missing',
          method:'post',
          body
        }
      }
    }),
    reportFound:builder.mutation({
      query: (body) => {
        console.log("Auth Api Found Request");
        console.log(body);
        
        return {
          url :'uploads/found',
          method:'post',
          body
        }
      }
    }),
    missingRequest:builder.mutation({
      query:()=>{
        return {
          url:'uploads/missing',
          method:'get',
        }
      }
    }),
    pendingRequest:builder.mutation({
      query:()=>{
        return {
          url:'uploads/pending',
          method:'get',
        }
      }
    }),
    foundRequest:builder.mutation({
      query:()=>{
        return {
          url:'uploads/found',
          method:'get',
        }
      }
    }),
    approveRequest:builder.mutation({
      query:(body)=>{
        console.log("=============",body,"=============");
        return{
          url:'uploads',
          method:'patch',
          body
        }
      }
    }),
    deleteRequest:builder.mutation({
      query:(body)=>{
        console.log(body);
        return{
          url:'uploads',
          method:'delete',
          body
        }
      }
    })
  }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation,useReportFoundMutation,useRegisterMutation,useReportMissingMutation,useFoundRequestMutation,useMissingRequestMutation,usePendingRequestMutation,useApproveRequestMutation,useDeleteRequestMutation } = authApi