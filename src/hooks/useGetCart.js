import {useQuery} from 'react-query';
import axios from 'axios'
import API_URL from '../helper/apiHelper';
import {AuthContext} from '../context/AuthContext';
import { useContext } from 'react';

export default function useGetCart() {
      const {state} = useContext(AuthContext); 
      let user_id = state.user_id  
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }  
      return useQuery(`carts-${user_id}`, async () => {
            if(state?.user_id){
                  const result = await axios.get(`${API_URL}/carts/${user_id}`, options);
                  return result.data;
            }
      });

}
