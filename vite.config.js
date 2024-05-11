import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv'; // Import dotenv plugin
import path from 'path'; // Import path for resolving directories

dotenv.config(); // Load environment variables from .env file

export default defineConfig({
    plugins: [
        enhancedImages(),
        sveltekit() // SvelteKit's Vite plugin
    ],
    resolve: {
        alias: {
            $components: path.resolve('./src/components'), // Alias for components
            $lib: path.resolve('./src/lib'), // Alias for lib
            $stores: path.resolve('./src/stores') // Alias for stores
        }
    }
    // other configurations...
});
