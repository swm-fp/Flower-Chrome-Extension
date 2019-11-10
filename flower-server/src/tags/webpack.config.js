const CopyPlugin = require('copy-webpack-plugin');
const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: slsw.lib.entries,
    mode: "none",
    target: 'node',
    output: {
        libraryTarget: "commonjs2",
        path: path.join(__dirname, ".webpack"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                                    plugins: [
                                        '@babel/plugin-proposal-class-properties'
                                    ]
                        },
                    }
                ],

            }
        ]
    },
    externals: [nodeExternals(), 'pg', 'sqlite3', 'tedious', 'pg-hstore'],
};
