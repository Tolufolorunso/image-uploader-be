const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary').v2
const path = require('path')

const uploadImage = async (req, res) => {
  const acceptedImage = ['jpg', 'jpeg', 'png']
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .json({ status: 'success', errorMsg: 'upload an image' })
  }
  // console.log(path.join(__dirname, '../', 'tmp'))
  const file = req.files.image
  // let fileToDelete = file.tempFilePath.split('\\')
  // fileToDelete = fileToDelete[fileToDelete.length - 1]
  // console.log('13', fileToDelete)
  if (!acceptedImage.includes(file.mimetype.split('/')[1])) {
    return res
      .status(400)
      .json({ status: 'fail', errorMsg: 'Accepted image format, jpeq,jpg,png' })
  }
  try {
    const image = await cloudinary.uploader.upload(file.tempFilePath, {
      width: 250,
      height: 250,
      crop: 'fill',
      gravity: 'face',
    })

    const imageUrl = image.url.substr(5)

    res.status(200).json({ status: 'success', imageUrl })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'fail', errorMsg: 'Something went wrong' })
  }
  console.log(file)
}

router.post('/', uploadImage)

module.exports = router
