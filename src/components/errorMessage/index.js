/**
 * Return error message component.
 * Blocks scene window and displays message and refresh button on top of it.
 * @module components/errorMessage
 * @author Igor Ivanov
 */

import commonConfig from '../../config/common';
import * as constants from '../../constants';

const { loaderError } = commonConfig.messages;
const refreshBtn = `<button class="refresh-button">${loaderError.buttonText}</button>`;
const errorComponent = `<div class="loading-error-message"><p>${loaderError.message}</p>${refreshBtn}</div>`;

const ErrorMessage = {
  /**
   * Displays error message on the top of the scene.
   * @param {HTMLElement} node
   *      node to be used as parent to display message.
   * @return {void} appends error component to parentNode.
   */
  displayError: function displayError(node) {
    if (node && typeof node === 'object') {
      node.innerHTML = errorComponent;
      const btn = document.querySelector('.refresh-button');

      btn.addEventListener(constants.CLICK, (eventData) => {
        eventData.preventDefault();
        eventData.stopPropagation();
        window.location.replace('/');
      });
    }
  }
};

export default ErrorMessage;
