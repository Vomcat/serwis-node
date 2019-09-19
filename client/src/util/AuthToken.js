import axios from "axios";

const AuthToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.com["x-auth-token"];
  }
};
export default AuthToken;