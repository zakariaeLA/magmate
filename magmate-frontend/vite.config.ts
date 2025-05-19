import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  optimizeDeps: {
    include: [
      '@ionic/angular',
      '@ionic/core/components',
      '@ionic/angular/css/core.css'
    ],
    exclude: [
      '@ionic/angular/common',
      '@ionic/angular/router'
    ]
  },
  resolve: {
    alias: {
      '@ionic/angular': '@ionic/angular/dist/index.mjs',
    }
  }
});