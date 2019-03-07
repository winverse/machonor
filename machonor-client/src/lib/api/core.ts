import axios from 'axios';

export const checkCountry = (): any => axios.get('/api/core/lang');