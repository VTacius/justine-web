'use strict';

import axios from 'axios';

export const peticion = axios.create({
    withCredentials: false,
    baseURL: 'http://127.0.0.1:3000' 
});