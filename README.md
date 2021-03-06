Vue plugin that helps to set and get data from vuex store

# Installations
```npm install samushi-global-settings```

## Usage
First you need to create vuex module with name global_settings and then to implement store in plugin 

```js
import GlobalSettings from 'samushi-global-settings'
import store from './store/index'

Vue.use(GlobalSettings, {store: store});

```

## How to get settings

imagine your state and getters is like this

```js

const state = {
    user: {
        name: "Sami Maxhuni",
        email: "samimaxhuni510@gmail.com"
    },
    banners: {
        show: true
    }
}

const getters = {
    getUserInfo: (state) => state.user,
    getBanners: (state) => state.banners
}

const mutations = {
    setUserInfo: (state, payload) => {
        state.user = Object.assign(state.user, payload);
    }   
}
```

when you want to get/set any value to the global settings you can do like this way example we do it this in component

```js

mounted(){
    this.$globalSettings().set('setUserInfo.name', "Jusuf Maxhuni");    
},

data(){
    return {
        user_name: this.$globalSettings().get('getUserInfo.name'),
        show_banner: this.$globalSettings().get('getBanners.show')
    }
}
```

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Y8Y43HYMD)
