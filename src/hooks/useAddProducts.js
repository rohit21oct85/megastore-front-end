
import {useHistory} from 'react-router-dom'
import {useMutation} from 'react-query'
import axios from 'axios'
import API_URL from '../helper/apiHelper';
import { useToasts } from 'react-toast-notifications';
import {AuthContext} from '../context/AuthContext';
import { useContext } from 'react';

export default function useAddProducts() {
      const history = useHistory();
      const {state} = useContext(AuthContext);        
      const { addToast } = useToasts();
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }  
      return useMutation(formData => {
            return axios.post(`${API_URL}/products`, formData, options)
        },{
            onSuccess: (data) => {
                  // console.log(data.data.id);
                  addToast('product added successfully', { appearance: 'success', autoDismiss: true });
                  history.push(`/add-products/upload/image/${data.data.id}`)
            }
        });
      
}
