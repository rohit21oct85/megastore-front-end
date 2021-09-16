import {useQueryClient, useMutation} from 'react-query'
import axios from 'axios'
import API_URL from '../helper/apiHelper';
import { useToasts } from 'react-toast-notifications';
import {AuthContext} from '../context/AuthContext';
import { useContext } from 'react';

export default function useAddToCart() {
      const queryClient = useQueryClient()
      const {state} = useContext(AuthContext);        
      const { addToast } = useToasts();
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }  
      return useMutation(formData => {
            return axios.post(`${API_URL}/carts`, formData, options)
        },{
            onSuccess: (data) => {
                  queryClient.invalidateQueries(`carts-${state.user_id}`)
                  addToast('cart added successfully', { appearance: 'success', autoDismiss: true });  
            }
        });
      
}
