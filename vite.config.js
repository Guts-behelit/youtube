import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
// https://vite.dev/config/

const manifestForPlugin ={
  registerType:'prompt',
  includeAssets:['favicon.ico','apple-touch-icon.png','masked-icon.png'],
  manifest:{
    name:'youVideo',
    short_name:'youVideo',
    description:'App that search and listen music',
    icons:[
      {src:'/imgpwa/android-chrome-192.png',sizes:'192x192',type:'image/png'},
      {src:'/imgpwa/512.png',sizes:'512x512',type:'image/png',purpose:'favicon'},
      {src:'/imgpwa/180.png',sizes:'180x180',type:'image/png',purpose:'apple touch icon'},
      {src:'/imgpwa/144.png',sizes:'144x144',type:'image/png',purpose:'any'},
      {src:'/imgpwa/256.png',sizes:'256x256',type:'image/png',purpose:'icon'},
      {src:'/imgpwa/384.png',sizes:'384x384',type:'image/png',purpose:'any masktable'}
    ],
    theme_color:'#FFFFFF',
    background_color:'#000000',
    display:'standalone',
    scope:'/',
    start_url:'/',
    orientation:'portrait'
  }
}

export default defineConfig({
  plugins: [react(),VitePWA(manifestForPlugin)],
  define: {
 
  },
})
