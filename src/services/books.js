import axios from 'axios'
import Auth from '@/services/auth.js'

axios.defaults.withCredentials = true
axios.defaults.crossDomain = true

/* eslint-disable no-unused-vars */
var API_ENDPOINT = 'https://' +
      process.env.VUE_APP_AWS_API_GATEWAY_ID + '.execute-api.' +
      process.env.VUE_APP_AWS_API_GATEWAY_REGION + '.amazonaws.com/' +
      process.env.VUE_APP_AWS_API_GATEWAY_STAGE + '/'

export default {
  search: function (word, by) {
    return new Promise((resolve, reject) => {
      Auth.refreshAuth().then((userSession) => {
        axios.get(API_ENDPOINT + 'bibuli/search', {
          headers: {
            Authorization: userSession.idToken
          },
          params: {
            word, by
          },
          data: {}
        }).then(result => {
          if ('matched_items' in result.data) {
            console.log(result)
            resolve(result.data.matched_items)
          } else {
            reject(new Error('no "matched_items" key'))
          }
        }, err => {
          console.log(err)
          reject(new Error(err))
        })
      })
    })
  },
  listRentals: function () {
    return new Promise(function (resolve, reject) {
      resolve([
        {
          thumbnail: 'https://images-fe.ssl-images-amazon.com/images/I/51bPeV7xPFL.jpg',
          title: '魔法の世紀',
          due_date: '2019/1/30'
        },
        {
          thumbnail: 'https://images-fe.ssl-images-amazon.com/images/I/51bPeV7xPFL.jpg',
          title: 'ある男',
          due_date: '2019/1/23'
        }
      ])
      // reject(new Error('Not Implemented'))
    })
  },

  rentalBook: function (bookId) {
    /*
    return new Promise(function (resolve, reject) {
      var xday = new Date()
      xday.setDate(xday.getDate() + 14)
      xday.setHours(19)
      xday.setMinutes(0)
      xday.setSeconds(0)
      xday.setMilliseconds(0)
      resolve({
        bookId: 'dummy-book-id',
        dueDate: xday
      })
      // reject(new Error('Not Implemented'))
    })
    */
    console.log({
      'book_id': bookId,
      'number_of_books': 1
    })
    return new Promise((resolve, reject) => {
      Auth.refreshAuth().then((userSession) => {
        axios.post(API_ENDPOINT + 'bibuli/checkout', {
          'book_id': bookId,
          'number_of_books': 1
        }, {
          headers: {
            Authorization: userSession.idToken
          }
        }).then(result => {
          if ('rental_objects' in result.data) {
            resolve(result.data)
          } else {
            reject(new Error('checkout failure'))
          }
        }, err => {
          console.log(err)
          reject(new Error(err))
        })
      })
    })
  },

  returnBook: function (bookId) {
    return new Promise(function (resolve, reject) {
      reject(new Error('Not Implemented'))
    })
  }
}
