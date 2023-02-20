const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));  //creamos la funcion sass importando la dependencia de sass para 
//   trabajar con el en la compilacion, gulp-sass sirve para conectarlos a ambos
const plumber = require('gulp-plumber');

async function css () {

    src('src/scss/**/*.scss')        // identificar archivo sass \ con los asteriscos hacemos que busque en todo scss
    .pipe(plumber())            // evitar que se detenga el workflow al tener errores.
    .pipe(sass())               //compilarlo
    .pipe(dest('build/css'));   //guardarlo en el disco
}


exports.css = css;  // se llama a la funcion a traves de node js por eso la sintaxis diferente a js


async function dev() {
    watch('src/scss/**/*.scss', css) //con watch escuchamos los cambios producidos  y luego ejecutamos css
}


    
exports.dev = dev;  