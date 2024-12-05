/**
 * @author Muhammad Adriansyah ( Seaavey )
 * @module function
 * @description Kumpulan fungsi yang sering digunakan
 *
 * @license MIT
 * @copyright 2024
 *
 */

const axios = require("axios");

/**
 * Mengekstrak URL pertama dari sebuah string
 * @param {string} string - Teks yang mengandung URL
 * @returns {string|null} URL yang ditemukan atau null
 *
 * @example
 * getUrl('Cek link https://example.com di sini')
 * // Returns: 'https://example.com'
 */
function getUrl(string) {
  const match = string.match(/https?:\/\/[^\s]+/i);
  return match ? match[0] : null;
}

/**
 * Mendapatkan ukuran file dari URL
 * @param {string} url - URL file
 * @returns {Promise<number>} Ukuran file dalam bytes
 *
 * @example
 * getSize('https://example.com/file.pdf')
 *   .then(size => console.log(size)) // 1024
 */
function getSize(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios.head(url);
      resolve(res.headers["content-length"]);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Mendapatkan tipe MIME dari URL
 * @param {string} url - URL file
 * @returns {Promise<string>} Tipe MIME
 *
 * @example
 * getMime('https://example.com/image.jpg')
 *   .then(mime => console.log(mime)) // 'image/jpeg'
 */
function getMime(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios.head(url);
      resolve(res.headers["content-type"]);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Mengubah ukuran bytes menjadi format yang dapat dibaca manusia
 * @param {number} bytes - Ukuran dalam bytes
 * @param {boolean} [si=true] - Gunakan standar SI (1000) atau biner (1024)
 * @param {number} [dp=2] - Jumlah desimal
 * @returns {string} Ukuran yang diformat
 *
 * @example
 * formatSize(1500000) // '1.50 MB'
 * formatSize(1500000, false) // '1.43 MiB'
 */
function formatSize(bytes, si = true, dp = 2) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return `${bytes.toFixed(dp)} ${units[u]}`;
}

/**
 * Mengubah detik menjadi format waktu yang dapat dibaca
 * @param {number} seconds - Jumlah detik
 * @returns {string} Representasi waktu dalam format manusia
 *
 * @example
 * runtime(3665)
 * // Returns: "1 hour, 1 minute, 5 seconds"
 */
function runtime(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

/**
 * Mengkapitalisasi huruf pertama setiap kata
 * @param {string} query - Kalimat input
 * @returns {string} Kalimat dengan huruf pertama kapital
 *
 * @example
 * toUpper('hello world') // 'Hello World'
 */
function toUpper(query) {
  const arr = query.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(" ");
}

/**
 * Mengubah huruf pertama setiap kata menjadi lowercase
 * @param {string} query - Kalimat input
 * @returns {string} Kalimat dengan huruf pertama lowercase
 *
 * @example
 * toLower('Hello World') // 'hello world'
 */
function toLower(query) {
  const arr = query.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toLowerCase() + arr[i].slice(1);
  }

  return arr.join(" ");
}

module.exports = {
  getUrl,
  getSize,
  getMime,
  formatSize,
  runtime,
  toUpper,
  toLower,
};
