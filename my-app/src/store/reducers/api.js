import { LOGIN_COMPLETE, TOKEN_REFRESH } from "../actions/types/api";

const initialState = {
    id: null,
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    refresh: null,
    access: null
};

export function apiReducer(state = initialState, action) {
    switch(action.type){
        
        case LOGIN_COMPLETE: {
            const {user,tokenObject} = action.payload;
            return {
                id: user.id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                refresh: tokenObject.refresh,
                access: tokenObject.access,
            };
        }

        case TOKEN_REFRESH: {
            const {accessToken} = action.payload;
            return {
                id: state.id,
                username: state.username,
                first_name: state.first_name,
                last_name: state.last_name,
                email: state.email,
                refresh: state.refresh,
                access: accessToken
            };
        }
        
        default: 
            return state;
    };
};
