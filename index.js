/**
 * Modul Utilitas Umum
 * @module GeneralUtilities
 * @description Mengumpulkan berbagai fungsi utilitas untuk pengambilan data dan manipulasi string
 */

/**
 * Mengimpor fungsi-fungsi dari modul fetcher
 * @function fetchBuffer - Mengambil data buffer dari URL
 * @function fetchJson - Mengambil data JSON dari URL
 */
const { fetchBuffer, fetchJson } = require("./lib/fetcher");

/**
 * Mengimpor fungsi-fungsi utilitas dari modul function
 * @function getUrl - Ekstraksi URL dari string
 * @function getSize - Mendapatkan ukuran file dari URL
 * @function getMime - Mendapatkan tipe MIME file
 * @function formatSize - Memformat ukuran byte menjadi format yang dapat dibaca
 * @function runtime - Mengubah detik menjadi format waktu yang ramah pengguna
 * @function toUpper - Mengkapitalisasi huruf pertama setiap kata
 * @function toLower - Mengubah huruf pertama setiap kata menjadi lowercase
 */
const {
  getUrl,
  getSize,
  getMime,
  formatSize,
  runtime,
  toUpper,
  toLower,
} = require("./lib/function");

/**
 * Ekspor semua fungsi utilitas
 * @exports GeneralUtilities
 */
module.exports = {
  // Fungsi Fetcher
  fetchBuffer, // Mengambil buffer dari URL
  fetchJson, // Mengambil JSON dari URL

  // Fungsi Utilitas URL
  getUrl, // Ekstrak URL dari teks
  getSize, // Dapatkan ukuran file
  getMime, // Dapatkan tipe MIME

  // Fungsi Formatting
  formatSize, // Format ukuran byte
  runtime, // Format waktu dari detik

  // Fungsi Manipulasi String
  toUpper, // Kapitalisasi kata
  toLower, // Lowercase kata
};
