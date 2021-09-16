
import {useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import API_URL from '../helper/apiHelper';
import { useToasts } from 'react-toast-notifications';
import {AuthContext} from '../context/AuthContext';
import { useContext } from 'react';

export default function useAddProductImage() {
      const queryClient = useQueryClient()
      const history = useHistory();
      const {state} = useContext(AuthContext);        
      const { addToast } = useToasts();
      const options = {
            headers: {
                  'Authorization': 'Bearer '+state.access_token,
                  'Content-Type':  'multipart/form-data'
            }
      }  
      return useMutation(formData => {
            return axios.post(`${API_URL}/upload`, formData, options)
        },{
            onSuccess: (data) => {
                  queryClient.invalidateQueries(`products-${state.user_id}`)
                  addToast('products images added successfully', { appearance: 'success', autoDismiss: true });
                  history.push(`/add-products/view`)
            }
        });
      
}
