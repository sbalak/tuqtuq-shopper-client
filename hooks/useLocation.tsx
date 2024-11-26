import  { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as Location from "expo-location";
import {API_URL} from '@env';

const initialState = {
    locationState: { locality: null }, setLocality: async () => {}
}

type LocationContextType = {
    locationState: { locality: string | null };
    setLocality: () => Promise<any>;
}

const LocationContext = createContext<LocationContextType>(initialState);

interface Props extends PropsWithChildren {}

const LocationProvider: React.FC<Props> = ({ children }) => {
    const [locationState, setLocationState] = useState<{ locality: string | null }>({ locality: "Loading..." });
    
    useEffect(() => {
        const loadLocality = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status != 'granted') {
              console.log("Please grant location permissions");
              return;
            }
            
            await setLocality();
          }
          loadLocality();
    }, []);

    const setLocality = async () => {
        try {
            let geocode = await Location.getCurrentPositionAsync({});
            let address = await Location.reverseGeocodeAsync({
              longitude: geocode.coords.longitude,
              latitude: geocode.coords.latitude
            });
            
            const response = await axios.post(`${API_URL}/User/SetCoordinates?userId=1&latitude=`+ geocode.coords.longitude + `&longitude=` + geocode.coords.longitude); 
            
            setLocationState({
                locality: address[0].district
            });

            return response;
        } catch (error) {
            console.log((error as any).response.data);
        }
    }

    return <LocationContext.Provider value={{ locationState, setLocality }}>{children}</LocationContext.Provider>
}

export default LocationProvider;

export const useLocation = () => {
    const context = useContext(LocationContext);

    if (!context) {
        throw new Error('useLocation can be accessible only within the LocationProvider')
    }

    return context;
}