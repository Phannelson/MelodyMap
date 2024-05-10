import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const config = {
        // Add any necessary preprocessing options here
        preprocess: preprocess({
                scss: {
                        prependData: `@import 'src/styles/variables.scss';` // Example SCSS variable import
                },
                typescript: true // Enable TypeScript preprocessing
        }),

        kit: {
                adapter: adapter(),
                // Additional kit options can go here
                alias: {
                        $components: 'src/components',
                        $types: 'src/types',
                        $styles: 'src/styles'
                }
        }
};

export default config;