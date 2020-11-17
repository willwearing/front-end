import axios from 'axios';
import { axiosWithAuth } from './../utils/axiosWithAuth';

export const ADD_PROJECT = 'ADD_PROJECT';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const SET_USERDETAILS = 'SET_USERDETAILS';



export const addProject = project => {
    return(dispatch) => {
        axiosWithAuth().post(`/api/projects`, project)
            .then( res => {
                dispatch({type: ADD_PROJECT, payload: project});
            })
            .catch( err => {
                console.log(err);
            })
    }
}

export const fetchProjects = () => {
    return(dispatch) => {
        axiosWithAuth().get(`/api/projects`)
            .then(res => {
                dispatch({type: FETCH_PROJECTS, payload: res.data})
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const setUserDetails = user => {
    return(dispatch) => {
        dispatch({type: SET_USERDETAILS, payload: user});
    }
}
