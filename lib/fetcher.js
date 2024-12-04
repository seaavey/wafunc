const axios = require("axios");

/**
 * Mengambil data buffer dari URL dengan konfigurasi fleksibel
 * @param {string} url - URL sumber data yang akan diambil
 * @param {Object} [options={}] - Konfigurasi tambahan untuk permintaan
 * @returns {Promise<Object>} Objek dengan detail buffer
 *
 * @example
 * fetchBuffer('https://example.com/image.jpg')
 *   .then(result => {
 *     console.log(result.filename); // 'image.jpg'
 *     console.log(result.mimetype); // 'image/jpeg'
 *   })
 */
function fetchBuffer(url, options = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        // Konfigurasi headers default dengan user-agent modern
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "Upgrade-Insecure-Requests": "1",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
          ...(options.headers ? options.headers : {}),
        },
        responseType: "stream",
        ...(options && delete options.headers && options),
      })
      .then(async ({ data, headers }) => {
        // Konversi stream ke buffer
        let buffer = await toBuffer(data);

        // Ekstrak nama file dari header
        let position = headers
          .get("content-disposition")
          ?.match(/filename=(?:(?:"|')(.*?)(?:"|')|([^"'\s]+))/);
        let filename =
          decodeURIComponent(position?.[1] || position?.[2]) || null;

        // Deteksi mime type
        let mimetype =
          mimes.lookup(filename) ||
          (await fileTypeFromBuffer(buffer)).mime ||
          "application/octet-stream";

        // Deteksi ekstensi file
        let ext =
          mimes.extension(mimetype) ||
          (await fileTypeFromBuffer(buffer)).ext ||
          "bin";

        // Kembalikan objek dengan informasi lengkap
        resolve({ data: buffer, filename, mimetype, ext });
      })
      .catch(reject);
  });
}

/**
 * Mengambil data JSON dari URL
 * @param {string} url - URL sumber data JSON
 * @param {Object} [options={}] - Konfigurasi tambahan untuk permintaan
 * @returns {Promise<Object>} Data JSON
 *
 * @example
 * fetchJson('https://api.example.com/data')
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */
function fetchJson(url, options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      // Kirim permintaan GET dan ambil data
      let res = await axios.get(url, options);
      resolve(res.data);
    } catch (e) {
      reject(e);
    }
  });
}

// Ekspor fungsi untuk digunakan di modul lain
module.exports = { fetchBuffer, fetchJson };
