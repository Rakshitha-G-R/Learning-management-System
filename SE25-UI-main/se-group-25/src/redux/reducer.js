import { ConstructionOutlined } from '@mui/icons-material'
import * as ActionTypes from './ActionTypes'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { getDefaultNormalizer } from '@testing-library/react'
import axios from 'axios';

//TODO : Add environment variables
//process.env.BACKEND_URI

const initialState = {
  users: [],
  loggedInUser: null,
}

const reducer = (state = initialState, action) => { 
  switch (action.type) {
    case ActionTypes.REGISTER:
      axios.post('http://localhost:8080/api/users/register', 
        {
          email: `${action.payload.email}`, 
          password: `${action.payload.pass}`,
          fname: `${action.payload.fname}`,
          lname: `${action.payload.lname}`,
          type: "unapproved"
        }).then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
      return {
        ...state,
        users: [...state.users, action.payload],
      }

    case ActionTypes.LOGIN:
      return {
        ...state,
        loggedInUser: action.payload,
      }

    case ActionTypes.CHANGE_PASSWORD:
      axios.patch('http://localhost:8080/api/users/update/password', 
      {
        email: `${action.payload.id}`, 
        password: `${action.payload.pass}`,
      }).then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
      return {
        ...state,
        loggedInUser: action.payload,
      }
    default:
      return state;
  }
}

export default configureStore({reducer})