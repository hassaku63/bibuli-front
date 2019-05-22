import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './services/auth.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedIn: Auth.isLoggedin(),
    rentalList: []
  },

  mutations: {
    // loggedIn
    login (state) {
      state.loggedIn = true
    },
    logout (state) {
      state.loggedIn = false
    },
    // rentalList
    setRentalList (state, books) {
      state.rentalList = books
    },
    returnBook (state, rentalId) {
      state.rentalList = state.rentalList.filter(book => {
        return book.rental_id !== rentalId
      })
    }
  }
})

export default store
