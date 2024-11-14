import  { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

export const API_URL = "https://shopper-development-api.azurewebsites.net";

const initialState = {
    authState: { token: null, authenticated: null }, register: async () => {}, login: async () => {}, logout: async () => {}
}

type AuthContextType = {
    authState: { token: string | null, authenticated: boolean | null };
    register: (email: string, password: string) => Promise<any>;
    login: (email: string, password: string) => Promise<any>;
    logout: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType>(initialState);

interface Props extends PropsWithChildren {}

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [authState, setAuthState] = useState<{ token: string | null, authenticated: boolean | null }>({ token: null, authenticated: null });

    useEffect(() => {
        const loadAccessToken = async () => {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            console.log("Stored Access Token: ", accessToken);
            console.log("Stored Refresh Token: ", refreshToken);
            
            if (accessToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                setAuthState({
                    token: accessToken,
                    authenticated: true
                });        
            }
            else {
                setAuthState({
                    token: null, 
                    authenticated: false
                });
            }  
        };

        // Add a request interceptor
        axios.interceptors.request.use(function (config) {
            console.log("Request Log: Do something before request is sent");
            return config;
        }, function (error) {
            console.log("Request Error: Do something with request error")
            return Promise.reject(error);
        });

        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
            console.log("Response Log: Any status code that lie within the range of 2xx cause this function to trigger")
            // Do something with response data
            return response;
        }, function (error) {
            console.log("Response Error: Any status codes that falls outside the range of 2xx cause this function to trigger")
            // Do something with response error
            return Promise.reject(error);
        });

        loadAccessToken();
    }, []);

    const register = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/register`, { email, password });

            return response;
        } catch (error) {
            return { error: true, message: (error as any).response.data };
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
            await SecureStore.setItem('accessToken', response.data.accessToken);
            await SecureStore.setItem('refreshToken', response.data.refreshToken);

            setAuthState({
                token: response.data.accessToken,
                authenticated: true
            });

            return response;
        } catch (error) {
            return { error: true, message: (error as any).response.data };
        }
    }

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('refreshToken');

            setAuthState({
                token: null,
                authenticated: false
            });          
            router.replace('/login');  
        } catch (error) {
            return { error: true, message: (error as any).response.data };
        }
    }
    
    return <AuthContext.Provider value={{ authState, register, login, logout }}>{children}</AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth can be accessible only within the AuthProvider')
    }

    return context;
}