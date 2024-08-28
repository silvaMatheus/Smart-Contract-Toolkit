import '@testing-library/jest-dom'
 
import { jest } from '@jest/globals'

// Configura o matchMedia mock para testes que dependem de media queries
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock global para fetch, se necessário
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock

// Silencia os logs de console durante os testes
console.log = jest.fn()
console.error = jest.fn()
console.warn = jest.fn()

// Adiciona qualquer outra configuração global necessária aqui