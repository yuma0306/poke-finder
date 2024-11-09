// src/mocks/node.js
import { setupServer } from 'msw/node'
import { handlers } from './mocks/handlers'
export const APIServer = setupServer(...handlers)