const path = require('path')

module.exports = (env) => {
	const mode = env.production ? 'production' : 'development';

	return {
		mode: mode,
		entry: './src/index.ts',
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: 'ts-loader',
					include: [path.resolve(__dirname, 'src')]
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						'style-loader',
						'css-loader',
						'sass-loader'
					]
				}
			]
		},
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'public')
		}
	}
}