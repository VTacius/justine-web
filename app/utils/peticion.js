'use strict';

import axios from 'axios';

export const vhttp = axios.create({
    withCredentials: true,
    baseURL: 'http://192.168.2.16:3000/'
});
