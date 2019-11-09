import api from "../utils/api";
import Http from "../utils/Http";
/**
 * 用户相关业务处理
 */

/**
 * 手机登录
 * @param {*} phone
 * @param {*} password
 */
export const loginPhone = async (phone, password) => {
    let result = await Http.get(api.LOGIN_PHONE, {
      phone,
      password
    });
    console.log(result);
    return result;
};

/**
 * 邮箱登陆
 * @param {*} email
 * @param {*} password
 */
export const loginEmail = async (email, password) => {
  let result = await Http.get(api.LOGIN_EMAIL, {
    email,
    password
  });
  console.log(result);
  return result;
};
export default {
  loginPhone,
  loginEmail
};
