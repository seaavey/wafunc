/**
 * @author Muhammad Adriansyah ( Seaavey )
 * @module core/parseMessage
 * @description Fungsi-fungsi untuk mengurai konten pesan dari objek pesan yang diberikan.
 *
 * @license MIT
 * @copyright 2024
 *
 */
const { extractMessageContent } = require("@seaavey/baileys");

/**
 * Mengurai konten pesan dari objek pesan yang diberikan.
 *
 * Fungsi ini akan mengekstrak konten pesan dari objek pesan yang mungkin
 * memiliki beberapa lapisan, termasuk pesan yang dapat dilihat sekali
 * dan pesan protokol. Fungsi ini akan mengembalikan konten pesan yang
 * paling dalam yang dapat diakses.
 *
 * @param {Object} content - Objek pesan yang akan diurai.
 * @returns {Object|null} - Konten pesan yang telah diurai atau null jika tidak ada konten.
 */
function parseMessage(content) {
  content = extractMessageContent(content);

  // Memeriksa apakah konten adalah pesan yang dapat dilihat sekali
  if (content && content.viewOnceMessageV2Extension) {
    content = content.viewOnceMessageV2Extension.message;
  }

  // Memeriksa apakah konten adalah pesan protokol dengan tipe tertentu
  if (
    content &&
    content.protocolMessage &&
    content.protocolMessage.type == 14
  ) {
    let type = getContentType(content.protocolMessage);
    content = content.protocolMessage[type];
  }

  // Memeriksa apakah konten memiliki pesan di dalamnya
  if (content && content.message) {
    let type = getContentType(content.message);
    content = content.message[type];
  }

  return content;
}

/**
 * Mendapatkan tipe konten dari objek pesan.
 *
 * Fungsi ini akan mencari kunci yang sesuai dengan tipe pesan yang
 * dapat diakses, seperti "conversation", "Message", "V2", atau "V3".
 *
 * @param {Object} content - Objek pesan yang akan diperiksa.
 * @returns {string|null} - Kunci tipe konten yang ditemukan atau null jika tidak ada.
 */
function getContentType(content) {
  if (content) {
    const keys = Object.keys(content);
    const key = keys.find(
      (k) =>
        (k === "conversation" ||
          k.endsWith("Message") ||
          k.includes("V2") ||
          k.includes("V3")) &&
        k !== "senderKeyDistributionMessage"
    );
    return key;
  }
}

/**
 * Melarikan karakter khusus dalam string untuk digunakan dalam ekspresi reguler.
 *
 * Fungsi ini akan mengganti karakter-karakter khusus dalam string dengan
 * karakter pelarian yang sesuai agar string tersebut dapat digunakan dalam
 * ekspresi reguler tanpa menyebabkan kesalahan.
 *
 * @param {string} string - String yang akan dilarikan.
 * @returns {string} - String yang telah dilarikan.
 */
function escapeRegExp(string) {
  return string.replace(/[.*=+:\-?^${}()|[\]\\]|\s/g, "\\$&");
}

module.exports = {
  parseMessage,
  getContentType,
  escapeRegExp,
};
