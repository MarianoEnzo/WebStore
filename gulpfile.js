const { src,dest,watch,parallel,tree } = require('gulp');
const gulp = require('gulp');
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const plumber = require("gulp-plumber");

function css(done) {
    try {
      src("src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/css"));
    } catch (error) {
      console.log(error);
    }
    done();
  }
  function watchChanges(done ){
    try {
      watch("src/scss/**/*.scss", css); //Vigila a ese archivo y si hay un cambio llama a esa funcion
      console.log("esta watcheando");
    } catch (error) {
      console.log(error)
    }
    done();
  }

exports.dev = parallel(watchChanges);