import { LOGIN_COMPLETE, TOKEN_REFRESH } from "../types/api";

export const addUserInfo = (user, tokenObject) => ({
    type: LOGIN_COMPLETE,
    payload: {user, tokenObject},
 });
 
export const refreshToken = (accessToken) => ({
   type: TOKEN_REFRESH,
   payload: {accessToken},
 }); 
 