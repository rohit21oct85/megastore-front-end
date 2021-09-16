import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import API_URL from '../helper/apiHelper';
import { useToasts } from 'react-toast-notifications';
import {AuthContext} from '../context/AuthContext';
import { useContext } from 'react';
import { useHistory } from 'react-router';

export default function useAddCategory() {
      const history = useHistory()
      const {state} = useContext(AuthContext);        
      const { addToast } = useToasts();
      const queryClient = useQueryClient()
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }  
      return useMutation(formData => {
            return axios.post(`${API_URL}/categories`, formData, options)
        },{
            onSuccess: (data) => {
                  queryClient.invalidateQueries(`categories`)
                  // console.log(data.data.id);
                  addToast('category added successfully', { appearance: 'success', autoDismiss: true });
                  history.push(`/add-category/create`)
            }
        });
      
}
