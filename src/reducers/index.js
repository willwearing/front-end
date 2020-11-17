import { ADD_PROJECT, FETCH_PROJECTS, SET_USERDETAILS } from './../actions'

const initialState = {
    projects: [],
    user: {
        name: '',
        password: '',
        email: '',
        role: ''
    }
}

export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_PROJECT:
            return {...state,
                projects: [...state.projects, action.payload]
            }
        case FETCH_PROJECTS:
            return {...state,
                projects: action.payload
            }
        case SET_USERDETAILS:
            return {...state,
                user: {...state.user,
                    name: action.payload.name,
                    password: action.payload.password,
                    email: action.payload.email,
                    role: action.payload.role
                }    
            }
        default:
            return state;
    }
}