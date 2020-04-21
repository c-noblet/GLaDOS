"use strict";

const gulp = require('gulp');
const gulpTS = require('gulp-typescript');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpNodemon = require('gulp-nodemon');
const del = require('del');
const path = require('path');

const project = gulpTS.createProject('tsconfig.json');

gulp.task('build', () => {
  // => Delete old files
  del.sync(["./build/**/*.*"]);
  // => Copy env
  gulp.src("./src/**/*.json").pipe(gulp.dest("build/"));
  gulp.src("./src/lib/**/*.*").pipe(gulp.dest("build/lib/"));
  gulp.src("./src/assets/**/*.*").pipe(gulp.dest("build/assets/"));
  // => Compile TS files
  const tsCompile = gulp.src("./src/**/*.ts").pipe(gulpSourcemaps.init()).pipe(project());
  return tsCompile.js.pipe(gulpSourcemaps.write({
    sourceRoot: file =>
      path.relative(path.join(file.cwd, file.path), file.base)
    })).pipe(gulp.dest("build/"));

  //const result = project.src().pipe(project());
  //return result.js.pipe(gulp.dest('build'));
});

gulp.task("watch", gulp.series("build"), function() {
  gulp.watch("./src/**/*.ts", ["build"]);
});

gulp.task("start", gulp.series("build"), function() {
  return gulpNodemon({
    script: "./build/server.js",
    watch: "./build/server.js"
  });
});

gulp.task("serve", gulp.series("build"), function() {
  return gulpNodemon({
    script: "./build/server.js",
    watch: "./build/"
  });
});