/**
 * @author Muhammad Adriansyah ( Seaavey )
 * @module uploader
 * @description Mengupload file media ke layanan hosting file Pomf.
 *
 * @license MIT
 * @copyright 2024
 *
 */

const axios = require("axios");
const FormData = require("form-data");
const fileType = require("file-type");

/**
 * Mengupload file media ke layanan hosting file Pomf.
 *
 * @async
 * @function Uploader
 * @param {Buffer} media - File media yang akan diupload.
 * @returns {Promise<string>} - URL dari file yang diupload.
 * @throws {Error} - Melemparkan error jika proses upload gagal.
 *
 */
async function Uploader(media) {
  try {
    // Menentukan tipe MIME dari file media
    let mime = await fileType.fromBuffer(media);
    let form = new FormData();

    // Menambahkan file media ke dalam data form
    form.append("files[]", media, `file-${Date.now()}.${mime.ext}`);

    // Mengirim permintaan POST untuk mengupload file
    let { data } = await axios.post("https://pomf.lain.la/upload.php", form, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
        ...form.getHeaders(),
      },
    });

    // Mengembalikan URL dari file yang diupload
    return data.files[0].url;
  } catch (e) {
    // Mencetak error dan melempar ulang
    console.error(e);
    throw e;
  }
}

module.exports = Uploader;
