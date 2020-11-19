
import { axiosWithAuth } from './../utils/axiosWithAuth';


export const ADD_PROJECT = 'ADD_PROJECT';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const SET_USERDETAILS = 'SET_USERDETAILS';
export const FETCH_USERPROJECTS = 'FETCH_USERPROJECTS';


export const addProject = project => {
    return(dispatch) => {
        console.log('look here', project)
        axiosWithAuth()
            .post(`/api/projects`, project) 
            .then( res => {
                dispatch({type: ADD_PROJECT, payload: res.data});

            })
            .catch( err => {              
                console.log(err);
            })
    }
}

export const deleteProject = id => {
    return (dispatch) => {
        axiosWithAuth().delete(`/api/projects/${id}`)
            .then(res => {
                dispatch({type: DELETE_PROJECT, payload: res.data})
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const updateProject = (id, project) => {
    return (dispatch) => {
        axiosWithAuth().put(`/api/projects/${id}`, project)
            .then(res => {
                dispatch({type: UPDATE_PROJECT, payload: res.data})
            })
            .catch(err => {
                console.log(err);
            })
    }
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

export const fetchUserProjects = id => {
    return(dispatch) => {
        axiosWithAuth().get(`/api/users/${id}/projects`)
            .then(res => {
                dispatch({type: FETCH_USERPROJECTS, payload: res.data});
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
