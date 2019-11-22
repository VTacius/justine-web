'use strict';

import axios from 'axios';

const credenciales = axios.create({
    withCredentials: false,
    baseURL: 'http://127.0.0.1:3000' 
});

const peticion = axios.create({
    withCredentials: false,
    baseURL: 'http://127.0.0.1:3000' 
});

export  {credenciales, peticion};