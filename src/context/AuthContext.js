import React,{useReducer} from 'react'

const fullname =  localStorage.getItem('fullname');
const user_id =  localStorage.getItem('user_id');
const email = localStorage.getItem('email');
const isLoggedIn = localStorage.getItem('isLoggedIn')
const access_token =  localStorage.getItem('access_token');
const refresh_token =  localStorage.getItem('refresh_token');

const initialState = {
    isLoggedIn: isLoggedIn ? isLoggedIn : false,
    user_id: user_id? user_id: null,
    fullname: fullname? fullname: null,
    email: email ? email : null,
    access_token: access_token? access_token: null,
    refresh_token: refresh_token? refresh_token: null
}
export const AuthContext = React.createContext(initialState);

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn, 
                fullname: action.payload.fullname, 
                user_id: action.payload.user_id, 
                email: action.payload.email,  
                access_token: action.payload.access_token, 
                refresh_token: action.payload.refresh_token, 
            }
            
        case 'LOGOUT':
            localStorage.clear();
            localStorage.removeItem('access_token');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user_id');
            localStorage.removeItem('fullname');
            localStorage.removeItem('email');    
            return {
                ...state,
                isLoggedIn: false,
                user_id: null,
                fullname: null,
                email: null,
                access_token: null,
            }    
        default:
            return state;
    }  
}

function AuthProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AuthContext.Provider value={{ state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
