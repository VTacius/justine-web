'use strict';

import axios from 'axios';

export const vhttp = axios.create({
    baseURL: 'http://127.0.0.1:3000/'
});