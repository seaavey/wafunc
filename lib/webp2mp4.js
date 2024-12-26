const axios = require("axios");
const FormData = require("form-data");
const cheerio = require("cheerio");
const { Blob } = require("buffer");

/**
 *
 * @param {Buffer|String} source
 */
async function webp2mp4(source) {
  let form = new FormData();
  let isUrl = typeof source === "string" && /https?:\/\//.test(source);
  const blob = !isUrl && new Blob([source]);
  form.append("new-image-url", isUrl ? source : "");
  form.append("new-image", isUrl ? "" : blob, "image.webp");

  let res = await axios.post("https://s6.ezgif.com/webp-to-mp4", form, {
    headers: form.getHeaders(),
  });

  let $ = cheerio.load(res.data);
  let form2 = new FormData();
  let obj = {};

  $("form input[name]").each((_, input) => {
    const name = $(input).attr("name");
    const value = $(input).val();
    obj[name] = value;
    form2.append(name, value);
  });

  let res2 = await axios.post(
    "https://ezgif.com/webp-to-mp4/" + obj.file,
    form2,
    { headers: form2.getHeaders() }
  );

  $ = cheerio.load(res2.data);
  const videoSrc = $("div#output > p.outfile > video > source").attr("src");

  return new URL(videoSrc, res2.config.url).toString();
}

async function webp2png(source) {
  let form = new FormData();
  let isUrl = typeof source === "string" && /https?:\/\//.test(source);
  const blob = !isUrl && new Blob([source]);
  form.append("new-image-url", isUrl ? source : "");
  form.append("new-image", isUrl ? "" : blob, "image.webp");

  let res = await axios.post("https://s6.ezgif.com/webp-to-png", form, {
    headers: form.getHeaders(),
  });

  let $ = cheerio.load(res.data);
  let form2 = new FormData();
  let obj = {};

  $("form input[name]").each((_, input) => {
    const name = $(input).attr("name");
    const value = $(input).val();
    obj[name] = value;
    form2.append(name, value);
  });

  let res2 = await axios.post(
    "https://ezgif.com/webp-to-png/" + obj.file,
    form2,
    { headers: form2.getHeaders() }
  );

  $ = cheerio.load(res2.data);
  const imgSrc = $("div#output > p.outfile > img").attr("src");

  return new URL(imgSrc, res2.config.url).toString();
}

module.exports = {
  webp2mp4,
  webp2png,
};
