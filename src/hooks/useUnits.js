import {useQuery} from 'react-query';
import axios from 'axios';
import API_URL from '../helper/apiHelper';

export default function useUnits() {

    return useQuery('units', async () => {
        const result = await axios.get(`${API_URL}/units`);
        return result.data;
    });   
}
