/**
 * Module contains application gulp tasks
 * @module gulpfile.js
 */
const fs = require('fs');

const gulp = require('gulp');
const rename = require('gulp-rename');

/**
 * Handling gulp error, breaks task execution and trows an error
 * @param {object} err - error object
 * @return {void}
 */
function handleError(err) {
  process.exit(-1);
  throw new Error(err.toString());
}

/**
 * Creates directories if they does not exist.
 * @function
 * @return {Promise} gulp task
 */
gulp.task('createFilePaths', async function createFilePaths() {
  const folders = ['dist', 'dist/assets', 'dist/assets/svg', 'dist/assets/img'];

  folders.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      // eslint-disable-next-line no-console
      console.log('📁folder created:', dir);
    }
  });
});

/**
 * Copying all files that should be placed in application root folder
 * @return {Promise} gulp task
 */
gulp.task('copyRootFiles', async () => {
  await new Promise((resolve) => {
    // prettier-ignore
    gulp
      .src('./assets/public/*.*')
      .pipe(gulp.dest('./dist/'))
      .on('end', resolve)
      .on('error', handleError);
  });
});

/**
 * Copying all svg files in application img/svg
 * @function
 * @return {Promise} gulp task
 */
gulp.task('copySvgFiles', async function copySvgFiles() {
  await new Promise((resolve) => {
    gulp
      .src('./assets/svg/*.*')
      .pipe(gulp.dest('./dist/assets/svg/'))
      .on('end', resolve)
      .on('error', handleError);
  });
});

/**
 * Copying production favicon
 * @function
 * @return {Promise} gulp task
 */
gulp.task('copyProdFavicon', async function copyProdFavicon() {
  await new Promise((resolve) => {
    gulp
      .src('./assets/icons/prod-favicon.png')
      .pipe(rename('favicon.png'))
      .pipe(gulp.dest('./dist/assets/img/'))
      .on('end', resolve)
      .on('error', handleError);
  });
});

/**
 * Copying sprite sheets
 * @return {Promise} gulp task
 */
gulp.task('spriteSheets', async () => {
  await new Promise((resolve) => {
    gulp
      .src('./src/assets/resources/**/*.json')
      .pipe(rename({ dirname: '' }))
      .pipe(gulp.dest('./dist/assets/img/'))
      .on('end', resolve)
      .on('error', handleError);
  });
});

/**
 * Combines gulp tasks in `postbuild` task.
 */
gulp.task(
  'postbuild',
  // prettier-ignore
  gulp.parallel(
    'createFilePaths',
    'copyRootFiles',
    'copySvgFiles',
    'copyProdFavicon',
  )
);
