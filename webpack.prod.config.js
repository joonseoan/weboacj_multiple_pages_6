/**
 * [Multiple pages]
 * 
 * 1. A single bundle.js in dist folder is a single page application.
 *  But this is not the only usage of Webpack. In some projects,
 *  we need to have more than one html page specifically in server side rendering.
 * 
 * 2. 
 */

 const path = require("path");
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 const { CleanWebpackPlugin } = require("clean-webpack-plugin");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 
 module.exports = {
   entry: {
     // two page names by using object
     'hello': './src/hello.js',
     'kiwi': './src/kiwi.js',
   },
   output: {
     // two keys above will get into [name]
     // However, in the workplace, the most common substitutions that can be
     // used are name in square bracket, contenthash in square bracket and id in square bracket.
     // The id is not going to be human readable name.
     filename: "[name].[contenthash].js",
     // filename: bundle.[contenthash].js,
     path: path.resolve(__dirname, "./dist"),
 
     publicPath: "",
   },
   mode: "production",
   // optimized common bundle for each html page.
   optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 3000, // if the dependency size is min 3kb, it can be a custom common dependency.
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
         use: [MiniCssExtractPlugin.loader, "css-loader"],
       },
       {
         test: /\.scss/,
         use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
     new MiniCssExtractPlugin({
       // Same as above in entry {}
       filename: "[name].[contenthash].css",
       //  filename: "styles.[contenthash].css",
     }),
     new CleanWebpackPlugin({
       cleanOnceBeforeBuildPatterns: [
         '**/*',
         path.join(process.cwd(), 'build/**/*'),
       ]
     }),
    // 2) separating html file with specific js and css file.
    new HtmlWebpackPlugin({
      filename: 'hello-world.html',
      // "hello" is a key name of "entry" above.
      // we can use multiple chunks in an array, btw.
      chunks: ['hello'],
      title: 'Hello World!',
      template: 'src/page-template.hbs',
      description: 'Hello World',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'kiwi.html',
      // "kiwi" is a key name of "entry" above.
      // we can use multiple chunks in an array, btw.
      chunks: ['kiwi'],
      title: 'Kiwi',
      template: 'src/page-template.hbs',
      description: 'Kiwi',
      minify: false,
    })

    // 1)
    // Using a single html file with two js and css files.
    //  new HtmlWebpackPlugin({
    //    title: 'Hello World!',
    //    template: 'src/index.hbs',
    //    description: 'Some page',
    //    // For readable index.html. (default value is true)
    //    minify: false,
    //  }),
   ],
 };
 