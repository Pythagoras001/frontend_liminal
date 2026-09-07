import axios from 'axios'

import { env } from '@/config/env'
import { setupAuthInterceptor } from '@/services/api/auth-interceptor'

export const ApiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Pragma: 'no-cache',
  },
})

setupAuthInterceptor(ApiClient)
