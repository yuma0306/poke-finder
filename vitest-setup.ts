import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { APIServer } from './src/test/server';

/**
 * テスト前のルーティン
 */
beforeAll(() => APIServer.listen());
/**
 * テスト後のルーティン
 */
afterAll(() => APIServer.close());
afterEach(() => APIServer.resetHandlers());