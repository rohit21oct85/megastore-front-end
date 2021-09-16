import {useQuery} from 'react-query';
import axios from 'axios';
import API_URL from '../helper/apiHelper';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function useMyProducts() {
      const {state} = useContext(AuthContext); 
      let user_id = state.user_id  
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      } 
    return useQuery(`products-${user_id}`, async () => {
        if(state.user_id){
              const result = await axios.get(`${API_URL}/my-products/${user_id}`, options);
              return result.data;
        }  
    });   
}
