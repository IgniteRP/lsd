import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'

export default defineConfig(() => {
	return {
		envDir: '../',
		envPrefix: ['SERVER_', 'CLIENT_'],

		resolve: {
			alias: {
				server: resolve(__dirname),
			},
		},
	}
})
