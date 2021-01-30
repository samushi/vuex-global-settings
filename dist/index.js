/*!
 * samushi-global-settings v0.0.1
 * (c) Sami Maxhuni
 * Released under the MIT License.
 */
'use strict';

var index = {
  install: function install(Vue, opts) {
    Vue.prototype.$globalSettings = function () {
      var optionsDefaults = {
        store: {},
        prefix: 'global_settings'
      };
      var options = Object.assign({}, optionsDefaults, opts);
      return {
        /**
         * Get Global Settings by dot array
         * @param setting
         * @returns {any}
         */
        get: function get(setting) {
          if (setting.indexOf('.')) {
            var result = options.store.getters["".concat(options.prefix, "/").concat(dotToArray(setting)[0])];
            dotToArray(setting, true).forEach(function (key) {
              if (result && result.hasOwnProperty(key)) {
                result = result[key];
              }
            });
            return result;
          }

          return options.store.getters["".concat(options.prefix, "/").concat(setting)];
        },

        /**
         * Set Global Setting by dot or just key
         * @param key
         * @param value
         */
        set: function set(key, value) {
          if (key.indexOf('.')) {
            var obj = oneDArrayToMultidimensional(key, value);
            options.store.commit("".concat(options.prefix, "/").concat(dotToArray(key)[0]), obj);
          } else {
            options.store.commit("".concat(options.prefix, "/").concat(key), value);
          }
        }
      };
    };
    /**
     * Turn a string in dot notation into a nested object with a value
     * @param array
     * @param value
     * @returns {{}}
     */


    var oneDArrayToMultidimensional = function oneDArrayToMultidimensional(array, value) {
      var tempObject = {};
      var container = tempObject;
      array.split('.').map(function (k, i, values) {
        if (i !== 0) {
          container = container[k] = i === values.length - 1 ? value : {};
        }
      });
      return tempObject;
    };
    /**
     * dotToArray
     * @param string
     * @param except
     * @returns {[]}
     */


    var dotToArray = function dotToArray(string) {
      var except = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var properties = [];
      string.split('.').forEach(function (property, index) {
        if (except && index === 0) {
          return;
        }

        properties.push(property);
      });
      return properties;
    };
  }
};

module.exports = index;
