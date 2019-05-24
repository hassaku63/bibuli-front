import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './services/auth.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedIn: Auth.isLoggedin(),
    searchList: [],
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
    // searchList
    setSearchList (state, books) {
      state.searchList = books
    },
    decrStock (state, bookId) {
      for (let i = 0; i < state.searchList.length; i++) {
        if (state.searchList[i].book_id === bookId) {
          state.searchList[i].stock--
        }
      }
    },
    incrStock (state, bookId) {
      for (let i = 0; i < state.searchList.length; i++) {
        if (state.searchList[i].book_id === bookId) {
          state.searchList[i].stock++
        }
      }
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
