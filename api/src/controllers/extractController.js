const express = require('express');
const router = express.Router();
const multer = require('multer');
module.exports = router;
const tesseract = require('node-tesseract');
const path = require('path');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const tesseractocr = require("node-tesseract-ocr")

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './src/uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname.split(' ').join(''));
    }
});

var upload = multer({ storage: storage });

var cpUpload = upload.fields([{ name: 'logo' }])

router.post('/data', cpUpload, async (req, res) => {
    try {
        let logo = '';
        if (req.files.logo) {
            for (pic of req.files.logo) {
                logo = pic;
            }
            const file_path = path.join(path.dirname(__dirname), 'uploads', logo.filename.split(' ').join(''));


            var options = {
                l: 'eng',
                psm: 6,
                binary: '/usr/local/bin/tesseract'
            };
            tesseract.process(file_path, options, function (err, text) {
                if (err) {
                    console.error(err);
                    return res.status(200).json({ success: false, error: err, message: 'Text extraction failed' });
                } else {
                    return res.status(200).json({ success: true, message: 'Logo Updated', text: text });
                }
            })
        } else {
            return res.status(200).json({ success: false, error: err, message: 'Logo Updation failed' });
        }
    } catch (err) {
        return res.status(400).json({ success: false, error: err, message: 'Update Logo failed' });
    }
});


router.post('/data1', cpUpload, async (req, res) => {
    try {
        let word = [];
        let logo = '';
        if (req.files.logo) {
            for (pic of req.files.logo) {
                logo = pic;
            }
            const file_path = path.join(path.dirname(__dirname), 'uploads', logo.filename.split(' ').join(''));
            const [result] = await client.labelDetection(file_path);
            const labels = result.labelAnnotations;
            console.log('Labels:');
            labels.forEach(label => word.push(label.description));
            return res.status(200).json({ success: true, message: 'Text extracted', logo: word });
        } else {
            return res.status(200).json({ success: false, error: err, message: 'Logo Updation failed' });
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ success: false, error: err, message: 'Update Logo failed' });
    }
});

router.post('/data2', cpUpload, async (req, res) => {
    try {
        let logo = '';
        if (req.files.logo) {
            for (pic of req.files.logo) {
                logo = pic;
            }
            const file_path = path.join(path.dirname(__dirname), 'uploads', logo.filename.split(' ').join(''));

            const config = {
                lang: "eng",
                oem: 1,
                psm: 3,
            }
            tesseractocr.recognize(file_path, config)
                .then(text => {
                    console.log("Result:", text)
                    return res.status(200).json({ success: true, message: 'Logo Updated', text: text });
                })
                .catch(error => {
                    console.error(error.message);
                    return res.status(200).json({ success: false, error: error.message, message: 'Text extraction failed' });
                })
        } else {
            return res.status(200).json({ success: false, error: err, message: 'Logo Updation failed' });
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ success: false, error: err, message: 'Update Logo failed' });
    }
});