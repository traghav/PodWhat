import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Page from './Page.vue'
import Multiselect from 'vue-multiselect'
import firebase from 'firebase';
import uuidv1 from 'uuid';
import router from './router';
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-125262000-1'
})
Vue.component('multiselect', Multiselect)
var config = {
    apiKey: "AIzaSyCCthibXD_sPqZXcGMzUM_3lGKiylnPRjk",
    authDomain: "podwhatapp.firebaseapp.com",
    databaseURL: "https://podwhatapp.firebaseio.com",
    projectId: "podwhatapp",
    storageBucket: "podwhatapp.appspot.com",
    messagingSenderId: "136289330656"
  };

var app = firebase.initializeApp(config);
Vue.component('v-select', vSelect)
new Vue({
  router,               // Add this line
  render: h => h(App)
}).$mount('#app')