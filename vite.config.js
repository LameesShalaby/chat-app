import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/chat-app/',
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 3000, // Set a limit that suits your needs
    },

})