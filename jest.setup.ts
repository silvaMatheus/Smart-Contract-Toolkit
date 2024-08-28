import '@testing-library/jest-dom'
import 'jest-canvas-mock'
import { TextDecoder, TextEncoder } from 'util'

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

 class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  constructor() {
    this.observe = jest.fn()
    this.unobserve = jest.fn()
    this.disconnect = jest.fn()
  }

  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
  takeRecords = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
})

 Object.defineProperty(window, 'scroll', {
  value: jest.fn(),
})

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as typeof global.TextDecoder

Object.defineProperty(global.crypto, 'subtle', {
  value: {
    digest: jest.fn().mockResolvedValue(new ArrayBuffer(32)),
  },
})

 global.URL.createObjectURL = jest.fn()

 console.warn = jest.fn()
console.error = jest.fn()

 afterEach(() => {
  jest.clearAllMocks()
})