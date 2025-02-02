export const environment = {
  production: false,
  baseUrl: 'http://16.171.64.178:81/api/',
  authentication: {
    registerUser: 'Auth/RegisterUser',
    loginUser: 'Auth/LoginUser',
    registerVendor: 'Auth/RegisterVendor',
    loginVendor:'Auth/LoginVendor',
    test: 'Auth/test'
  },
  userAccount: {
    userDetails: 'UserAccount/UserDetails',
    updateAddress: 'UserAccount/UpdateAddress',
    updatePassword: 'UserAccount/UpdatePassword',
  }
  
};

