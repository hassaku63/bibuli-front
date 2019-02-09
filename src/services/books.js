// import axios from 'axios'

/* eslint-disable no-unused-vars */

export default {
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
  },

  returnBook: function (bookId) {
    return new Promise(function (resolve, reject) {
      reject(new Error('Not Implemented'))
    })
  }
}
