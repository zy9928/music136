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

/**
 * 发送验证码
 * @param {*} phone 
 */
export const sendCode = async (phone)=>{
    let result  = await Http.get(api.SEND_CODE,{
        phone
    });
    return result;
}

/**
 * 验证验证码
 * @param {*} phone 
 * @param {验证码} captcha 
 */
export const verifyCode  = async(phone,captcha)=>{
  let result  = await Http.get(api.VERIFY_CODE,{
    phone,captcha
  });
  return result;
}

export const  register = async(captcha,phone,password,nickname)=>{
  let result = await Http.get(api.REGISTER_PHONE,{
    captcha,phone,password,nickname
  });
  return result;
}

export default {
    loginPhone,
    loginEmail,
    sendCode,
    verifyCode,
    register
};
