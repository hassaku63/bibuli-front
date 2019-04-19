import AWS from 'aws-sdk'
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser
} from 'amazon-cognito-identity-js'

import appConfig from '../../app.config'

AWS.config.region = appConfig.region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: appConfig.IdentityPoolId
})

const loginsKey = 'cognito-idp.' + appConfig.region + '.amazonaws.com/' + appConfig.UserPoolId
var cognitoIdentity = {
  userPool: null,
  user: null,
  token: null,
  session: null
}

const getCurrentUserSession = function () { // eslint-disable-line
  const keyPrefix = 'CognitoIdentityServiceProvider.' + appConfig.ClientId
  const username = sessionStorage.getItem(keyPrefix + '.LastAuthUser')
  console.log(keyPrefix + '.' + username)
  return {
    'username': sessionStorage.getItem(keyPrefix + '.' + username),
    'idToken': sessionStorage.getItem(keyPrefix + '.' + username + '.idToken'),
    'refreshToken': sessionStorage.getItem(keyPrefix + '.' + username + '.refreshToken')
  }
}

const refreshAuth = function () { // eslint-disable-line
  /*
    API Gatewayへのリクエストを伴う処理を実装する場合は必ずrefreshAuth.thenのコンテキストで実行させる
    IdTokenがExpireしていた場合にのみリフレッシュを行う

    https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js
    Use case 32. 参照
  */
  return new Promise((resolve, reject) => {
    if (AWS.config.credentials.needsRefresh()) {
      // Token refresh
      var refreshToken = cognitoIdentity.session.getRefreshToken()
      cognitoIdentity.user.refreshSession(refreshToken, (err, session) => {
        if (err) {
          console.error(err)
          reject(new Error('Refresh session failure'))
        } else {
          cognitoIdentity.session = session

          AWS.config.credentials.params.Logins[loginsKey] = session.getIdToken().getJwtToken()
          AWS.config.credentials.refresh((err) => {
            if (err) {
              console.error(err)
              reject(new Error('Credentials refresh failure'))
            } else {
              resolve(getCurrentUserSession())
            }
          })
        }
      })
    } else {
      // No refresh
      resolve(getCurrentUserSession())
    }
  })
}

export default {
  login: function (username, password) {
    return new Promise((resolve, reject) => {
      // try login
      cognitoIdentity.userPool = new CognitoUserPool({
        UserPoolId: appConfig.UserPoolId,
        ClientId: appConfig.ClientId,
        Storage: sessionStorage
      })

      cognitoIdentity.user = new CognitoUser({
        Username: username,
        Pool: cognitoIdentity.userPool,
        Storage: sessionStorage
      })

      var authnDetails = new AuthenticationDetails({
        Username: username,
        Password: password
      })

      cognitoIdentity.user.authenticateUser(authnDetails, {
        onSuccess: function (session) {
          cognitoIdentity.session = session

          // credential set
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: appConfig.IdentityPoolId,
            Logins: {
              [loginsKey]: session.getIdToken().getJwtToken()
            }
          })

          resolve(cognitoIdentity.user)
        },
        onFailure: function (err) {
          reject(err)
        }
      })
    })
  },
  refreshAuth: refreshAuth,
  logout: function (callback) {
    sessionStorage.clear()
    if (callback) {
      callback()
    }
  },
  isLoggedin: function () {
    return AWS.config.credentials.needsRefresh()
  }
}
