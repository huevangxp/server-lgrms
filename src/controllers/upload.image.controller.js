const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage')
const firebaseConfig = require('../firebase/firebase.config.json')
const firebase = require('firebase/app');
const multer = require('multer')

const routes = require('express').Router();

const upload = multer({
    storage: multer.memoryStorage()
})

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

routes.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const folder = 'products';
        const fileName = `${folder}/${Date.now() + '.' + req.file.originalname}`;
        const storageRef = ref(storage, fileName);
        const metadata = {
            contentType: req.file.mimetype
        }
        
        const snapshot = uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL((await snapshot).ref);

        res.status(200).json({ url: downloadURL })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

module.exports = routes;