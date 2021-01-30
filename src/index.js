export default {
    install (Vue, opts) {

        Vue.prototype.$globalSettings = () => {

            let optionsDefaults = {
                store: {},
                prefix: 'global_settings'
            };

            const options = { ...optionsDefaults, ...opts }

            return {
                /**
                 * Get Global Settings by dot array
                 * @param setting
                 * @returns {any}
                 */
                get(setting) {
                    if(setting.indexOf('.')){
                        let result = options.store.getters[`${options.prefix}/${dotToArray(setting)[0]}`];

                        dotToArray(setting, true).forEach((key)=>{
                            if(result && result.hasOwnProperty(key)) {
                                result = result[key];
                            }
                        });
                        return result;

                    }
                    return options.store.getters[`${options.prefix}/${setting}`];
                },

                /**
                 * Set Global Setting by dot or just key
                 * @param key
                 * @param value
                 */
                set(key, value){
                    if(key.indexOf('.')){
                        let obj = oneDArrayToMultidimensional(key, value);
                        options.store.commit(`${options.prefix}/${dotToArray(key)[0]}`, obj);
                    }else{
                        options.store.commit(`${options.prefix}/${key}`, value);
                    }

                }
            }
        }

        /**
         * Turn a string in dot notation into a nested object with a value
         * @param array
         * @param value
         * @returns {{}}
         */
        const oneDArrayToMultidimensional = (array, value) => {
            let tempObject = {};
            let container = tempObject;

            array.split('.').map((k, i, values) => {
                if(i !== 0) {
                    container = (container[k] = (i === values.length - 1 ? value : {}))
                }
            });

            return tempObject;
        }

        /**
         * dotToArray
         * @param string
         * @param except
         * @returns {[]}
         */
        const dotToArray = (string, except = false) => {
            let properties = [];
            string.split('.').forEach((property, index) => {

                if(except && index === 0){
                    return;
                }
                properties.push(property);
            });

            return properties
        }


    }
}

