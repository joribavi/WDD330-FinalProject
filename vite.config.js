import {resolve} from 'path' 
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'  

export default defineConfig({
  root: "src/", //src will be the root directory for vite
  base: '/WDD330-FinalProject/', 
  build: {
     outDir: '../dist' ,
     rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        events: resolve(__dirname, "src/sub-pages/events/index.html"),
        forum: resolve(__dirname, "src/sub-pages/forum.html"),
        media: resolve(__dirname, "src/sub-pages/media.html"),
        others: resolve(__dirname, "src/sub-pages/others.html"),
        studyPlan: resolve(__dirname, "src/sub-pages/study-plan.html"),

      }
     }
    
  }
       
  ,

  plugins: [
    tailwindcss(),
  ]

});