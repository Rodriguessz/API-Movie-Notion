const path = require('path');
const crypto = require('crypto');

const multer = require('multer');


//Folders to keep the files sent by the user
//The file will be storage in tmp folder for a while and after will be definitely storage in uploads folder;
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, "uploads");


//Multer configuration
const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback){

            const fileHash = crypto.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;

            return callback(null, filename)
        }
    })
}

module.exports =  {
    TMP_FOLDER,
    UPLOAD_FOLDER,
    MULTER,
}


