// Xử lý tất cả các rejection không được xử lý

process.on('unhandledRejection', (reason, promise) => {

  console.log('Unhandled Rejection at:', promise, 'reason:', reason);

  // Thực hiện xử lý tại đây

});

// Xử lý tất cả các exception không được xử lý

process.on('uncaughtException', (err, origin) => {

  console.error('Unhandled Exception occurred: ', err);

  // Thực hiện xử lý tại đây

});

// on server

require('./server');
