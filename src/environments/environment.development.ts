export const environment = {
  production: false,
  // baseUrl: 'https://16.171.64.178:81/api/'
  // baseUrl: 'https://16.171.64.178/api/',
  baseUrl: 'https://www.surewina.com/api/',
  authentication: {
    registerUser: 'Auth/RegisterUser',
    loginUser: 'Auth/LoginUser',
    registerVendor: 'Auth/RegisterVendor',
    loginVendor: 'Auth/LoginVendor',
    test: 'Auth/test'
  },
  prizeDepot: {
    getDepot: 'Depot/Get', 
    addDepot: 'Depot/Add'
  },
  draw: {
    addDraw: 'Draw/Add',
    getTodayDraw: 'Draw/GetToday',
    getDrawHistory: 'Draw/GetDrawHistory',
    getConfigWin: 'Draw/GetConfigurations',
    setConfigWin: 'Draw/SetDrawConfiguration'
  },
  prize: {
    addPrize: 'Prize/AddPrize',
    getAllPrize: 'Prize/GetAll'
  },

  winningConfig: {
    configWinnig: ''
  },
  userAccount: {
    userDetails: 'UserAccount/UserDetails',
    updateAddress: 'UserAccount/UpdateAddress',
    updatePassword: 'UserAccount/UpdatePassword',
  },
  userTicket: {
    buyTicketWeb: 'UserTicket/BuyTicket',
    buyTicket: 'UserTicket/BuyTicketInApp',
    onGoingTicket: 'UserTicket/GetOngoingTickets',
    vendorTicketHistory: 'UserTicket/GetVendorHistory',
    ticketById: 'UserTicket/GetTicketPrizesWon?ticketRefNumber=',
    winnerBoard: 'UserTicket/WinnersBoard?numberOfDraws=10',
    winnerBoardUser: 'UserTicket/WinnersBoard?numberOfDraws=4',
    winnersBoardAdmin:'UserTicket/WinnersBoard?numberOfDraws=1',
    getWinnerByMonth: 'UserTicket/DrawsByMonth',
    getTicketPrizeWon: 'UserTicket/GetTicketPrizesWon',
    getWinnerByDrawId: 'UserTicket/GetWinnerByDrawId',
    getClamWinningTicket: 'UserTicket/ClaimWinningTicket'
  },
  user: {
    getAllUser: 'User/GetAllUsers',
    getUserId: 'User/GetUser?userId='
  },
  ticketDescription: {
    addTicket: 'TicketDescription/Add',
    getAll: 'TicketDescription/GetAll'
  },
  vendor: {
    getAllVendor: 'Vendor/GetAllVendors', 
    getVendorSummary: 'Vendor/GetVendorSummary'
  },
  analytics: {
    getAnalyticsAdmin: 'Analytics/GetOverallSummary?countype=2',
    getAnalyticsSalesSummary: 'Analytics/GetSalesSummary'
  }

};

