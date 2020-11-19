import { ADD_PROJECT, FETCH_PROJECTS, DELETE_PROJECT, UPDATE_PROJECT, SET_USERDETAILS } from './../actions';

const initialState = {
    projects: [],
    user: {
        name: '',
        password: '',
        email: '',
        role: '',
        id: ''
    },
    isLoading: true
}

export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_PROJECT:
            return {...state,
                projects: [...state.projects, action.payload]
            }
        case FETCH_PROJECTS:
            return {...state,
                projects: action.payload,
                isLoading: false
            }
        case DELETE_PROJECT: 
            return {...state,
                projects: action.payload
            }
        case UPDATE_PROJECT:
            return {...state,
                projects: state.projects.map(proj => {
                    if(action.payload.id === proj.id) {
                        return action.payload;
                    }
                    return proj
                })
            }
        case SET_USERDETAILS:
            return {...state,
                user: {...state.user,
                    name: action.payload.name,
                    password: action.payload.password,
                    email: action.payload.email,
                    role: action.payload.role,
                    id: action.payload.id
                }    
            }
        default:
            return state;
    }
}