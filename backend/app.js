const express = require('express');
const uuid = require('uuid').v4;
const fs = require('fs');
const fileUpload = require("express-fileupload");
const path = require('path');
const mongoose = require('mongoose');
const Image = require('./models/image');
const albumRoutes = require('./routes/albumRoutes');

// express app
const app = express();

// middleware & static files
app.use(express.static('public'));
app.use(express.static('uploads'));
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//register view engine
app.set('view engine', 'ejs');

// connect to mongodb
const PORT = 3000 || process.env.PORT;
const dbURI = 'mongodb://127.0.0.1:27017/test122';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
  app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}...`)});
  console.log('connected to db');
})
.catch(err => console.log(err));

const connection = mongoose.connection;
connection.on('error', console.log);

app.post('/foo/uploadfiles/:id', fileUpload({ createParentPath: true }), (req, res) => {
        const files = req.files
        console.log(files)
        
        const id = req.params.id;
        const newfiles = [];

        Object.keys(files).forEach(key => {
            const ext = path.extname(files[key].name); 
            const idimage = uuid();
            // const urlreq = req.url.substring(17);
            // const filePath = `../frontend/public/uploads/images-${urlreq}/${id}${ext}`;
            const filePath = `../frontend/public/uploads/images-${id}/${idimage}${ext}`;

            console.log(filePath, key)
            newfiles.push(`images-${id}/${idimage}${ext}`)

            files[key].mv(filePath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            })
        })
        console.log(newfiles)
      
        Image.findByIdAndUpdate(id, { $push: { filePath: newfiles }})
        .then( result => { 
           res.json({ redirect: `/${id}` });
        })
        
        // return res.json({ status: 'success', message: Object.keys(files).toString() })
    }
)



// album routes
app.use(albumRoutes); 

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
