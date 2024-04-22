import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv'; // Import dotenv plugin

dotenv.config(); // Load environment variables from .env file

export default defineConfig({
    plugins: [sveltekit()],
    // other configurations...
});

