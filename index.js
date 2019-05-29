const multer   = require('multer')
const multerS3 = require('multer-s3')
const aws      = require('aws-sdk')
const express  = require('express')
const config   = require('config')

aws.config.update({
  secretAccessKey: config.get('secretAccessKey'),
  accessKeyId:     config.get('accessKeyId'),
  region:          config.get('region')
})

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'igordelorenzi/screenshots',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    contentDisposition: 'inline',
    acl: 'public-read',
    // serverSideEncryption: 'AES256',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, file.originalname) // Date.now().toString()
    }
  })
})

const router = express.Router()

router.post('/upload', upload.array('files[]', 2), function (req, res) {
  const data = { success: true, url: req.files[0].location }
  console.log('upload data', data)
  return res.json(data)
})

/*

const singleUpload = upload.single('image')

router.post('/upload', function (req, res) {
  singleUpload(req, res, function (err, some) {
    if (err) {
      // return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] })
      return res.status(422).send('Image Upload Error')
    }
    // return res.json({'imageUrl': req.file.location})
    if (req.file.mimetype === "image/jpeg") {
        // return res.json(`${req.file.location}.jpeg`)
        return res.send(JSON.stringify(req.file))
    }
    return res.json(req.file.location)
  });
})

*/

const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(router)

const PORT = process.env.PORT || 1337

app.listen(PORT , function() {
  console.log(`Server is running at PORT ${PORT}!`)
})
