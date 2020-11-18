import axios from 'axios';
import { axiosWithAuth } from './../utils/axiosWithAuth';


export const ADD_PROJECT = 'ADD_PROJECT';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const SET_USERDETAILS = 'SET_USERDETAILS';



export const addProject = project => {
    return(dispatch) => {
        console.log('look here', project)
        axiosWithAuth()
            .post(`/api/projects`, project) 
            .then( res => {
                debugger;
                dispatch({type: ADD_PROJECT, payload: res.data});

            })
            .catch( err => {              
                console.log(err);
                debugger;
            })
    }
}

export const deleteProject = id => {

}

export const fetchProjects = () => {
    return(dispatch) => {
        axiosWithAuth().get(`/api/projects`)
            .then(res => {
                dispatch({type: FETCH_PROJECTS, payload: res.data});
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
