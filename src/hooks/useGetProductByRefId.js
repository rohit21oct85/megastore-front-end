import {useQuery} from 'react-query';
import axios from 'axios';
import API_URL from '../helper/apiHelper';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router';

export default function useGetProductByRefId() {
      const params = useParams();
      const {state} = useContext(AuthContext); 
      let user_id = state.user_id
      let id = params?.refId
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      } 
    return useQuery(`product-${user_id}-${id}`, async () => {
        if(state.user_id && id){
              const result = await axios.get(`${API_URL}/get-product-by-id/${user_id}/${id}`, options);
              return result.data;
        }  
    });   
}
