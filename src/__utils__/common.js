/**
 * Module contains common test utils
 * @module __utils__/common
 * @author Igor Ivanov
 */
import chalk from 'chalk';

/* eslint-disable */

export const testName = (title, description) => `[${chalk.yellow(title)}]: ${description}`;

/* eslint-enable */
