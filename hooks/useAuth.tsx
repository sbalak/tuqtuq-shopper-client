import  { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import {AUTH_URL} from '@env';

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

        axios.interceptors.request.use(async (request) => {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            if (accessToken) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            }
            return request;
          }, error => {
            return Promise.reject(error);
          });

        // Add a response interceptor
        axios.interceptors.response.use(
            response => response, 
            async (error) => {
                const originalRequest = error.config;
                let retry = 0;
                if (error.response.status === 401 && !originalRequest._retry) {                    
                    const refreshToken = await SecureStore.getItemAsync('refreshToken');
                    
                    const response = await axios.post(`${AUTH_URL}/refresh`, { refreshToken });

                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

                    await SecureStore.setItem('accessToken', response.data.accessToken);
                    await SecureStore.setItem('refreshToken', response.data.refreshToken);

                    originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.

                    const retryRequest = await axios(originalRequest);

                    return retryRequest; // Retry the original request with the new access token.
                }
                return Promise.reject(error);
            }
        );

        loadAccessToken();
    }, []);

    const register = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${AUTH_URL}/register`, { email, password });

            return response;
        } catch (error) {
            return { error: true, message: (error as any).response.data };
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${AUTH_URL}/login`, { email, password });
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