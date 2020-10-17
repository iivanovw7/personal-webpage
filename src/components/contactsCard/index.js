/**
 * Contains Contacts Class constructor
 * Draws contacts element on the screen
 *
 * @module components/contactsCard
 * @author Igor Ivanov
 */
import contactsConfig from '../../config/contacts';
import * as constants from '../../constants';
import * as utils from '../../utils';

/**
 * Contacts constructor instance
 * @class ContactsCard
 * @constructor
 */
const ContactsCard = function ContactsCard() {
  this.container = document.querySelector('.contacts-typing-container');
  this.textChunks = [];

  // Destructuring config
  const { chunks, delay } = contactsConfig;

  /**
   * Fulfils textChunks array with text chunks creating them out of configuration object fields
   * Adds cursor symbol to last chunk
   *
   * - TEXT pattern: <p><span>"key"</span><span>:</span><span>"value"</span></p>
   *                      key(string):value(string)
   * - LINK pattern: <p><span>"key"</span><span>:</span><a href="link">"value"</a></p>
   *                      key(string):link(string)
   * @return {void}
   *    creates text chunks and moves them to chunks array
   */
  function createTextChunks() {
    utils.forEachCallback(chunks, (chunk, index) => {
      const key = `<span class="default nested">${chunk.key}: </span>`;
      const cursor = '<span class="cursor"> |</span>';
      const comma = '<span class="string">\'</span>';
      const lastElement = index === chunks.length - 1;
      let value = '';

      // Define chunk type
      switch (chunk.type) {
        case constants.TEXT:
          value = `<span class="string">'${chunk.value}'</span>`;
          break;
        case constants.LINK:
          value = `${comma}<a class="contacts-link" href="${chunk.link}">${chunk.value}</a>${comma}`;
          break;
        default:
          break;
      }

      value += lastElement ? `${cursor}` : ',';

      return this.textChunks.push(`<p class="contacts-typing-text">${key}${value}</p>`);
    });
  }

  /**
   * Appends chunks with configured delay (config.delay)
   * Finds previously appended text line and removes animation classname out of it
   * @return {void}
   *      appends text chunks
   */
  function appendChunks() {
    const self = this;
    const textClass = 'contacts-typing-text';
    let counter = 0;

    const timer = setInterval(function setInterval() {
      const rendered = document.querySelector(`.${textClass}`);

      // If element with textClass exists - remove class name
      if (rendered) rendered.classList.remove(textClass);
      // Append new text chunk to container
      self.container.innerHTML += self.textChunks[counter];
      counter += 1;
      // If last chunk - clear interval
      if (counter >= self.textChunks.length) clearInterval(timer);
    }, delay);
  }

  Object.assign(this, { createTextChunks, appendChunks });
};

/**
 * Inits Contacts rendering
 * @return {void}
 *    contacts component init function
 */
ContactsCard.prototype.init = function init() {
  this.createTextChunks();
  this.appendChunks();
};

// Ensure Singleton has one instance
const instance = new ContactsCard();
Object.freeze(instance);

export default instance;
