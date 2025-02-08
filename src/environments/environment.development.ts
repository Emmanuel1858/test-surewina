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
  draw: {
    addDraw: 'Draw/Add',
    getTodayDraw: 'Draw/GetToday'
  },
  prize: {
    addPrize: 'Prize/AddPrize',
    getAllPrize: 'Prize/GetAll'
  },
  userAccount: {
    userDetails: 'UserAccount/UserDetails',
    updateAddress: 'UserAccount/UpdateAddress',
    updatePassword: 'UserAccount/UpdatePassword',
  }, 
  userTicket: {
    buyTicket: 'UserTicket/BuyTicketInApp',
    onGoingTicket: 'UserTicket/GetOngoingTickets',
    winnerBoard: 'UserTicket/WinnersBoard?numberOfDraws=10'
  },
  user: {
    getAllUser: 'User/GetAllUsers', 
    getUserId: 'User/GetUser?userId='
  }
  
};

