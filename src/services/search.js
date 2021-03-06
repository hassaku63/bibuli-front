import axios from 'axios'

/* eslint-disable no-unused-vars */

export default {
  bookSearch: function (word, by) {
    console.log(process.env.VUE_APP_AWS_API_GATEWAY_DOMAIN)
    return new Promise(function (resolve, reject) {
      if (!validateArgs(word, by)) {
        reject(new Error('validation error'))
      }

      search(word, by).then(function (data) {
        resolve(data)
      })
    })
  }
}

const validateArgs = (word, by) => {
  if (by.toLowerCase() !== 'title') {
    return false
  }
  return true
}

const search = (word, by) => {
  return new Promise((resolve, reject) => {
    axios.get('https://' + process.env.VUE_APP_AWS_API_GATEWAY_DOMAIN + process.env.VUE_APP_AWS_API_PREFIX + '/search', {
      params: {
        word, by
      }
    }).then(result => {
      if ('matchted_items' in result) {
        resolve(result.matched_items)
      } else {
        reject(new Error('no "matched_items" key'))
      }
    }, err => {
      reject(new Error(err))
    })
  })
}

const dummySearch = (word, by) => {
  return new Promise((resolve, reject) => {
    resolve([
      {
        author: '西田幾多郎',
        book_id: 'QqZ0swEACAAJ',
        description: '真の実在とは何か、善とは何か、いかに生きるべきか、真の宗教心とは―。主観と客観が分かたれる前の「純粋経験」を手がかりに、人間存在に関する根本の問いを考え抜いた西田幾多郎(1870‐1945)。東洋の伝統を踏まえ、西洋的思考の枠組そのものを問題にした本書は、百年後まの今日までで日本の哲学の座標軸であり続ける。',
        isbn13: '9784003312414',
        publisher: 'ほげほげ',
        thumbnail_url: 'http://books.google.com/books/content?id=QqZ0swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        title: '善の研究'
      }
    ])
  })
}
