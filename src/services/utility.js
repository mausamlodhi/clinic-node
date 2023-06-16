import bcrypt from "bcryptjs";
import fs from "fs";
import dayjs from "dayjs";
import { date } from "joi";
export default {
    /**
   * Generate random string
   * @param {Number} length
   */
  generateRandomString: (length) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let output = '';

    for (let x = 0; x < length; x++) {
      const i = Math.floor(10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1))
      output += chars.charAt(i);
    }
    return output;
  },
  convertFormate(dateTime,formate = 'YYYY-MM-DD'){
    return dayjs(dateTime).format(formate);
},
getCurrentDateFormate(formate){
    return dayjs().format(formate ?? 'YYYY-MM-DD');
},
getDateOfBirth(date){
    try{
        const dt = new Date(date);
        return  {
        year : dt.getFullYear(),
        month : (dt.getMonth()+1),
        day : dt.getDate()
        };
    }catch(error){
        console.log(error);
        throw Error(error);
    }
},
genrateRandomNumber(length){
    try{
        return Math.floor(10 ** (length-1) + Math.random() * 9 * 10 ** (length-1))
    }catch(error){
        console.log(error);
        throw Error(error);
    }
},
validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
}
