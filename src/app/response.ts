const response = {
  AuthFailed: () => ({
    msg: "authFailed",
    code: 10000,
  }),
  Success: <T>(data: T, msg = "success") => ({
    msg,
    data,
    code: 200,
  }),
};

export default response;
