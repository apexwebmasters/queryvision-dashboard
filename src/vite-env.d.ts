
/// <reference types="vite/client" />

// Add custom interface for window with Electron process
interface Window {
  process?: {
    type?: string;
    versions?: {
      electron?: string;
      node?: string;
      chrome?: string;
    }
  }
}
