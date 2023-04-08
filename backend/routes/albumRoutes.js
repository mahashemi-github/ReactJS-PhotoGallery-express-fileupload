const express = require('express');
const albumController = require('../controllers/albumController');

var app = express()
app.use(express.json());
const router = express.Router();

router.get('/foo/albums', albumController.allalbum_index);
router.get('/foo/:id', albumController.album_details);
router.post('/foo/create', albumController.album_create);
router.patch('/foo/:id', albumController.delete_photos);
router.delete('/foo/:id', albumController.delete_album);

module.exports = router;