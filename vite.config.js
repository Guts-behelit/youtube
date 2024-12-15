import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env // Para asegurar que solo las variables necesarias estén disponibles
  },
  envPrefix: 'VITE_' // Asegura que solo las variables con el prefijo VITE_ se inyecten en el frontend
})
