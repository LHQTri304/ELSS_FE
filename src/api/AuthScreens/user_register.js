import axios from "axios";
import { API_BASE_URL } from "../DomainAPI";
import { images } from "../../constants";

export const user_register = async (username, password, email, rePassword) => {
  try {
    let newUser = {
      userName: username,
      passWord: password,
      Email: email,
    };

    const apiGetAuthCode = await axios.get(
      API_BASE_URL + "/api/v1/user/GetAuthenticationCode?email=" + email
      );
      return { newUser, otp: apiGetAuthCode.data };
  } catch (catchError) {
    console.error(catchError.message);
  }
};

export const user_checkInfo = async (username, password, email, rePassword) => {
  if (!email.endsWith("@gmail.com")) {
    if (!email.endsWith("@gm.uit.edu.vn")) {
      alert(`Định dạng email không đúng\nemail:${email}`);
      return false;
    }
  }

  if (username.length > 8 && password.length > 8) {
    const checkUsername = await axios.get(
      API_BASE_URL + "/api/v1/user/checkUserName?userName=" + username
    );

    if (checkUsername.data == true) {
      alert("Đã tồn tại username này");
      return false;
    }

    const checkEmail = await axios.get(
      API_BASE_URL + "/api/v1/user/checkEmail?email=" + email
    );

    if (checkEmail.data == true) {
      alert("Đã tồn tại email này");
      return false;
    }

    if (password !== rePassword) {
      alert("mật khẩu và nhập lại mật khẩu không giống");
      return false;
    }

    return true;
  } else {
    alert("Tài khoản và mật khẩu phải có tối thiểu 9 kí tự");
    return false;
  }
};

export const user_createAccountData = async (newUser) => {
  const response = await axios.post(
    API_BASE_URL +
      "/api/v1/user/CreateAccount?userName=" +
      newUser.userName +
      "&passWord=" +
      newUser.passWord +
      "&email=" +
      newUser.Email +
      "&image=" +
      images.blankAvatarForRegistration
  );
  return response;
};
