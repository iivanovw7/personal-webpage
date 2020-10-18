/**
 * Module contains Thingies Scene configuration
 * @module config/thingies
 */
import cursor from './../../assets/img/cursor.png';

/**
 * Object config - contains animation city Scene configuration
 * @type {object}
 * @property {String} customCursor - cursor image URL
 * @property {Object} sceneParams - scene parameters
 * @property {Object} filter - scene animation filter parameters
 */
const thingiesConfig = {
  customCursor: `url(${cursor}), auto`,

  sceneParams: {
    backgroundColor: 0x323232,
    autoResize: true,
    resolution: window.devicePixelRatio,
    AllowAudio: false,
    PausedInBackground: true
  },

  filter: {
    blurSize: 3
  },

  /**
   * Single image assets will be loaded by webpack loader, and stored in "BaseDir" folder
   * @type {*}
   * @property {String} BaseDir - folder containing images (assets)
   * @property {Object} Assets - assets description object used in texture loader
   */
  assets: {
    BaseDir: '/assets/img/',
    Assets: {
      thingiesBackground: {
        url: 'thingies_background.jpg',
        name: 'thingiesBackground'
      },
      thingiesItem1: {
        url: 'thingies_item_1.png',
        name: 'thingiesItem1'
      },
      thingiesItem2: {
        url: 'thingies_item_2.png',
        name: 'thingiesItem2'
      },
      thingiesItem3: {
        url: 'thingies_item_3.png',
        name: 'thingiesItem3'
      },
      thingiesItem4: {
        url: 'thingies_item_4.png',
        name: 'thingiesItem4'
      },
      thingiesItem5: {
        url: 'thingies_item_5.png',
        name: 'thingiesItem5'
      },
      thingiesItem6: {
        url: 'thingies_item_6.png',
        name: 'thingiesItem6'
      },
      thingiesItem7: {
        url: 'thingies_item_7.png',
        name: 'thingiesItem7'
      },
      thingiesItem8: {
        url: 'thingies_item_8.png',
        name: 'thingiesItem8'
      },
      thingiesItem9: {
        url: 'thingies_item_9.png',
        name: 'thingiesItem9'
      },
      thingiesItem10: {
        url: 'thingies_item_10.png',
        name: 'thingiesItem10'
      },
      thingiesItem11: {
        url: 'thingies_item_11.png',
        name: 'thingiesItem11'
      },
      thingiesItem12: {
        url: 'thingies_item_12.png',
        name: 'thingiesItem12'
      },
      thingiesItem13: {
        url: 'thingies_item_13.png',
        name: 'thingiesItem13'
      },
      thingiesItem14: {
        url: 'thingies_item_14.png',
        name: 'thingiesItem14'
      },
      thingiesItem15: {
        url: 'thingies_item_15.png',
        name: 'thingiesItem15'
      },
      thingiesItem16: {
        url: 'thingies_item_16.png',
        name: 'thingiesItem16'
      },
      thingiesItem17: {
        url: 'thingies_item_17.png',
        name: 'thingiesItem17'
      },
      thingiesItem18: {
        url: 'thingies_item_18.png',
        name: 'thingiesItem18'
      }
    }
  }
};

export default thingiesConfig;
