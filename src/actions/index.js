import axios from 'axios';

export const ADD_PROJECT = 'ADD_PROJECT';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';


export const addProject = project => {
    return(dispatch) => {
        axios.post(`https://vr-backend-lambda.herokuapp.com/api/projects`, project)
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
        axios.get(`https://vr-backend-lambda.herokuapp.com/api/projects`)
            .then(res => {
                dispatch({type: FETCH_PROJECTS, payload: res.data})
            })
            .catch(err => {
                console.log(err);
            })
    }
}
