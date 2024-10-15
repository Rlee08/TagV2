import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const workerUrl = mode === 'production' 
    ? 'https://tag-worker.ryantlee33.workers.dev'  // Default production URL
    : '`http://${location.hostname}:5172`'  // Development URL

  return {
    plugins: [react()],
    define: {
      'process.env.TLDRAW_WORKER_URL': JSON.stringify(process.env.TLDRAW_WORKER_URL || workerUrl),
    },
  }
})