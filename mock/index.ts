import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

import testModule from './test';

export function setupProdMockServer() {
  createProdMockServer([...testModule]);
}
