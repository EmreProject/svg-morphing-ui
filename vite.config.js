import { defineConfig } from 'vite';
const path=require("path"); 


export default defineConfig({
 // base:``,
  root: './src', // Specify the root directory, vite.config.js degil ama index.html bu yeni rootta olmalı!

    //alternatif
    //root: path.resolve(__dirname,"src"),

    publicDir: '../public', 

    build: {
      outDir: '../dist', // Specify the output directory relative to the root directory!!!!
    },
    server: {
        port: 3000, // Specify your desired port number here
      },
    resolve: { //sadece absolute kullan
      alias: {
        //absolute lazım!
        '@styles': path.resolve(__dirname,"./src/styles"),
        '@images': path.resolve(__dirname,"./src/images"), // Alias for the assets directory relative to the root!!!!
        "@scripts": path.resolve(__dirname,"./src/js")
      },
    },
});