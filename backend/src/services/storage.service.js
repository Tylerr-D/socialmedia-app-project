const ImageKit = require("imagekit")

// ImageKit handles image storage in the cloud
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

// Uploads a file and returns the response (includes .url)
async function uploadFile(file) {
  const result = await imagekit.upload({
    file: file.data,
    fileName: file.name
  })
  return result
}

module.exports = uploadFile