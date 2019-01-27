
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
  token: null
}

export default {
  login: function (username, password) {
    return new Promise((resolve, reject) => {
      // try login
      console.log('new CognitoUserPool')
      cognitoIdentity.userPool = new CognitoUserPool({
        UserPoolId: appConfig.UserPoolId,
        ClientId: appConfig.ClientId
      })

      console.log('new CognitoUser')
      cognitoIdentity.user = new CognitoUser({
        Username: username,
        Pool: cognitoIdentity.userPool
      })
      console.log(cognitoIdentity.user)

      console.log('new AuthenticationDetails')
      var authnDetails = new AuthenticationDetails({
        Username: username,
        Password: password
      })

      console.log('cognigoUser.authenticateUser')
      cognitoIdentity.user.authenticateUser(authnDetails, {
        onSuccess: function (result) {
          // Authn success
          var accessToken = result.getAccessToken().getJwtToken()
          cognitoIdentity.token = accessToken
          // resolve(cognitoIdentity)

          // credential set
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: appConfig.IdentityPoolId,
            Logins: {
              [loginsKey]: result.getIdToken().getJwtToken()
            }
          })

          // refresh
          AWS.config.credentials.refresh((err) => {
            if (err) {
              reject(err)
            } else {
              resolve(AWS, cognitoIdentity)
            }
          })
        },
        onFailure: function (err) {
          reject(err)
        }
      })
    })
  }
}
