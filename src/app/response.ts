const response = {
  AuthFailed: () => ({
    msg: "authFailed",
    code: 10000,
  }),
  Success: <T>(data?: T, msg = "success") => ({
    msg,
    data,
    code: 200,
  }),
  Error: (msg = 'error') => ({
    msg,
    code: 400
  }),
  NotFound: (msg = 'notFound') => ({
    msg,
    code: 404,
  })
};

export default response;
