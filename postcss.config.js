/**
 * POSTCSS configuration
 * @module postcss.config
 */
const postcssAutoPrefixer = require('autoprefixer');
const postcssCssNano = require('cssnano');
const args = require('minimist')(process.argv.slice(2));
const postcssAdvancedVariables = require('postcss-advanced-variables');
const postcssExtended = require('postcss-extend');
const postcssFailOnWarning = require('postcss-fail-on-warn');
const postcssFlexBugsFixes = require('postcss-flexbugs-fixes');
const postcssFunctions = require('postcss-functions');
const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');
const postcssModulesValues = require('postcss-modules-values');
const postcssNested = require('postcss-nested');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssUrl = require('postcss-url');

const functions = require('./src/styles/functions');
const mixins = require('./src/styles/mixins');
const settings = require('./src/styles/settings');

module.exports = ({ file }) => ({
  parser: file.extname === '.sass' ? 'sugarss' : 'postcss-scss',
  minimize: args.mode === 'production',
  plugins: [
    postcssImport,
    postcssUrl,
    postcssSimpleVars({
      variables: settings.defaults
    }),
    postcssFunctions({
      functions
    }),
    postcssMixins({
      mixins
    }),
    postcssFlexBugsFixes,
    postcssAdvancedVariables,
    postcssModulesValues,
    postcssExtended,
    postcssNested,
    postcssAutoPrefixer,
    postcssFailOnWarning,
    postcssPresetEnv({
      browsers: 'last 2 versions',
      stage: 0
    }),
    postcssCssNano({
      preset: 'default'
    }),
    postcssReporter({
      clearReportedMessages: false
    })
  ]
});
