import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Contacts from './components/contactsCard';
import Thingies from './components/thingiesScreen';
import thingiesConfig from './config/thingies';
import configureStore from './store/configureStore';
import * as utils from './utils';

import './styles/main.pcss';

// Requiring assets
utils.requireAll(require.context('./../assets/svg', true, /\.svg$/));
utils.requireAll(require.context('./../assets/resources/thingies', true, /\.(jpg|jpeg|png)$/));

const adaptiveSize = true;

// Create redux store with default scene size
const initialState = utils.setupInitialState(adaptiveSize, thingiesConfig);

// Create redux store with default scene size
const store = configureStore(initialState);

// Create animation scene
const ThingiesScene = new Thingies({
  store,
  adaptiveSize,
  ...utils.combineDefaultConfig('app', thingiesConfig)
});

window.onload = () => {
  ThingiesScene.init();
  Contacts.init();
};

// Webpack hot reloading
module.hot.accept();

utils.registerServiceWorker();
