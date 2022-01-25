/**
 * [Multiple Pages]
 */

 const path = require("path");
 const { CleanWebpackPlugin } = require("clean-webpack-plugin");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 
 module.exports = {
  // 2) multiple pages
  entry: {
    'hello': './src/hello.js',
    'kiwi': './src/kiwi.js',
  },
  // 1) single page
  //  entry: "./src/index.js",
   output: {
     // 2) Multiple pages.
     // Once again, we do not need to use [contenthash] over here
     filename: '[name].bundle.js',
     // 1) single page
    //  filename: "bundle.js",
     path: path.resolve(__dirname, "./dist"),
     publicPath: "",
   },
   mode: "development",
   devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
   },
   module: {
     rules: [
       {
         test: /\.(ttf)$/,
         type: "asset/resource",
       },
       {
         test: /\.(png|jpg)$/,
         type: "asset",
         parser: {
           dataUrlCondition: {
             maxSize: 3 * 1024,
           },
         },
       },
       {
         test: /\.txt/,
         type: "asset/source",
       },
       {
         test: /\.css/,
         use: ["style-loader", "css-loader"],
       },
       {
         test: /\.scss/,
         use: ["style-loader", "css-loader", "sass-loader"],
       },
       {
         test: /\.js$/,
         exclude: /node_modules/,
         use: {
           loader: "babel-loader",
           options: {
             presets: ["@babel/env"],
             plugins: ["@babel/plugin-proposal-class-properties"],
           },
         },
       },
       {
         test: /\.hbs/,
         use: ['handlebars-loader']
       }
     ],
   },
   plugins: [     
     new CleanWebpackPlugin({
       cleanOnceBeforeBuildPatterns: [
         '**/*',
         path.join(process.cwd(), 'build/**/*'),
       ]
     }),
     // 2) Multiple pages 
     new HtmlWebpackPlugin({
      filename: 'hello.html',
      title: 'Hello World!',
      // a key of the entry above
      chunks: ['hello'],
      template: 'src/page-template.hbs',
      description: 'Hello World'
    }),
    new HtmlWebpackPlugin({
      filename: 'kiwi.html',
      // a key of the entry above.
      chunks: ['kiwi'],
      title: 'Hello World!',
      template: 'src/page-template.hbs',
      description: 'Some page'
    }),
     // 1) Single page
    //  new HtmlWebpackPlugin({
    //    title: 'Hello World!',
    //    template: 'src/index.hbs',
    //    description: 'Some page'
    //  }),
   ],
 };
 