const express = require('express');
const router = express.Router();
//multer to upload files
const multer=require('multer');

//Img-size to know the size of image
const sizeOfImg = require('image-size');

//To crop the images
const jimp=require('jimp');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `Img_${file.originalname}`)
    }
  });
const upload = multer({ storage: storage });


router.post('/upload',upload.single('image'),(req,res,next)=>{
    //console.log("inside upload function",req.file);
    
    const file = req.file;
    
    if (!file) {

      let error = new Error('No File');
      error.httpStatusCode = 400;
      return next(error);

    }

    let pathOfFile="uploads/"+file.filename;
    var fileNameArr=file.filename.split(".");
    //console.log(fileNameArr[0],fileNameArr[1]);
    
    let dimensions=sizeOfImg(pathOfFile);

    //console.log("dimension height", dimensions.height,"dimensions width",dimensions.width);

   if( dimensions.height!=1024 || dimensions.width!=1024){
    //console.log("dimension height", dimensions.height,"dimensions width",dimensions.width);
      const error=new Error("Sorry Please upload an Image of 1024 X 1024");
       error.httpStatusCode= 400;
       res.json({"error":"Sorry Please upload an Image of 1024 X 1024"});
    }
    else{

jimp.read(pathOfFile, (err, file) => {
    if (err){
        console.log("error occurred while cropping");
    }
    file
      .crop(134.5,287,755,450) 
      .write('../../Frontend/frontend/src/assets/'+fileNameArr[0]+'horizontal.'+fileNameArr[1]); 
    });
jimp.read(pathOfFile, (err, file) => {
      if (err){
           console.log("error occurred while cropping");
       }
      file
        .crop(329.5,287,365,450) 
        .write('../../Frontend/frontend/src/assets/'+fileNameArr[0]+'vertical.'+fileNameArr[1]); 
       });
jimp.read(pathOfFile, (err, file) => {
         if (err){
             console.log("error occurred while cropping");
         }
         
      file
        .crop(329.5,406,365,212) 
        .write('../../Frontend/frontend/src/assets/'+fileNameArr[0]+'horizontal_small.'+fileNameArr[1]); 
 
         });
jimp.read(pathOfFile, (err, file) => {
      if (err){
               console.log("error occurred while cropping");
           }
           
      file
        .crop(322,322,380,380) 
        .write('../../Frontend/frontend/src/assets/'+fileNameArr[0]+'gallery.'+fileNameArr[1]); 
    });
       
       res.json({"file":[fileNameArr[0]+'horizontal.'+fileNameArr[1],
       fileNameArr[0]+'vertical.'+fileNameArr[1],
       fileNameArr[0]+'horizontal_small.'+fileNameArr[1],
       fileNameArr[0]+'gallery.'+fileNameArr[1]
      ]});
    }
      
})


module.exports=router;