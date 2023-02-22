const {src, dest, watch, parallel} = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));  //creamos la funcion sass importando la dependencia de sass para 
//   trabajar con el en la compilacion, gulp-sass sirve para conectarlos a ambos
const plumber = require('gulp-plumber');

//IMG
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const webp = require('gulp-webp');

async function css () {

    src('src/scss/**/*.scss')        // identificar archivo sass \ con los asteriscos hacemos que busque en todo scss
    .pipe(plumber())            // evitar que se detenga el workflow al tener errores.
    .pipe(sass())               //compilarlo
    .pipe(dest('build/css'));   //guardarlo en el disco
};

async function imagenes () {
    const opciones = {
        optimizationLevel: 3
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'));

}

async function imgWebp () {

    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
};


async function dev() {
    watch('src/scss/**/*.scss', css) //con watch escuchamos los cambios producidos  y luego ejecutamos css
};


exports.css = css;  // se llama a la funcion a traves de node js por eso la sintaxis diferente a js
exports.imagenes = imagenes;
exports.imgWebp = imgWebp;
exports.dev = parallel(imagenes, imgWebp, dev);

