const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

//adding .version() reloads file automatically if users haven't cleared cache
mix.js("resources/js/app.js", "public/js")
    .sourceMaps()
    .version()
    .sass("resources/sass/app.scss", "public/css");