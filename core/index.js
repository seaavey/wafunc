/**
 * @author Muhammad Adriansyah ( Seaavey )
 * @module core/index
 * @description Fungsi-fungsi untuk mengurai konten pesan dari objek pesan yang diberikan.
 *
 * @license MIT
 * @copyright 2024
 *
 */

// Mengimpor fungsi-fungsi dari modul parseMessage
const {
  parseMessage,
  getContentType,
  escapeRegExp,
} = require("./parseMessage");

/**
 * Modul ini mengekspor fungsi-fungsi yang digunakan untuk mengurai
 * dan memproses konten pesan, serta untuk melarikan karakter khusus
 * dalam string untuk digunakan dalam ekspresi reguler.
 *
 * Fungsi-fungsi yang diekspor:
 * - parseMessage: Mengurai konten pesan dari objek pesan.
 * - getContentType: Mendapatkan tipe konten dari objek pesan.
 * - escapeRegExp: Melarikan karakter khusus dalam string untuk ekspresi reguler.
 */

module.exports = {
  parseMessage,
  getContentType,
  escapeRegExp,
};
