
import {useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import API_URL from '../helper/apiHelper';
import { useToasts } from 'react-toast-notifications';
import {AuthContext} from '../context/AuthContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

export default function useUpdateProduct() {
      const history = useHistory();
      const params = useParams();
      const queryClient = useQueryClient()
      const {state} = useContext(AuthContext);        
      const { addToast } = useToasts();
      let id = params?.refId;

      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }  
      return useMutation(formData => {
            return axios.put(`${API_URL}/products/${id}`, formData, options)
        },{
            onSuccess: (data) => {
                  // console.log(data.data.id);
                  queryClient.invalidateQueries(`products-${state.user_id}`)
                  addToast('product added successfully', { appearance: 'success', autoDismiss: true });
                  history.push(`/add-products/view`)
            }
        });
      
}
