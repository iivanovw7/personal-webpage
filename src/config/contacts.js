/**
 * Module contains Contacts configuration
 * @module config/contacts
 * @author Igor Ivanov
 */
import * as constants from '../constants';

/**
 * Object config - contains text chunks configuration
 * @type {Object}
 * @property {number} delay
 *      delay between text animations (in ms)
 * @property {Array<object>} chunks
 *      array of text chunks parameters
 */
const contactsConfig = {
  delay: 1700,
  chunks: [
    {
      type: constants.TEXT,
      key: 'name',
      value: 'Igor Ivanov'
    },
    {
      type: constants.LINK,
      key: 'telegram',
      value: '@iivanovw7',
      link: 'https://t.me/iivanovw7'
    },
    {
      type: constants.LINK,
      key: 'email',
      value: 'iivanovw7@gmail.com',
      link: 'mailto:iivanovw7@gmail.com'
    },
    {
      type: constants.LINK,
      key: 'github',
      value: 'iivanovw7',
      link: 'https://github.com/iivanovw7'
    }
  ]
};

export default contactsConfig;
