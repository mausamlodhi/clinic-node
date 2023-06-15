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
}
