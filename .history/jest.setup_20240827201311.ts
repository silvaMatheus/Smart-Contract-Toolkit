import '@testing-library/jest-dom'

 

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

// Silencia os logs de console durante os testes, se necessário
// console.log = jest.fn()
// console.error = jest.fn()
// console.warn = jest.fn()