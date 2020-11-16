import axios from 'axios';

export const ADD_PROJECT = 'ADD_PROJECT';


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
