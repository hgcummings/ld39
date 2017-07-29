const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            enforce: "pre",
            use: ["./flow-loader"],
            include: path.join(__dirname, "src")
        }]
    }
}
