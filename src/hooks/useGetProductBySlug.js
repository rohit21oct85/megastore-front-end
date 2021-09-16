import {useQuery} from 'react-query';
import axios from 'axios';
import API_URL from '../helper/apiHelper';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import { useParams } from 'react-router';

export default function useGetProductBySlug() {
      const params = useParams();
      const {state} = useContext(AuthContext); 
      let slug = params?.slug

      return useQuery(`product-${slug}`, async () => {
        if(slug){
            const result = await axios.get(`${API_URL}/get-product-by-slug/${slug}`);
            return result.data;
        }
    });   
}
