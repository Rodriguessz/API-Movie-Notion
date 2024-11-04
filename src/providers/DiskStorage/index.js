const path = require('path');
const fs = require('fs');

const uploadConfigs = require("../../config/upload") 
const AppError = require('../../utils/AppError')

class DiskStorage{
    async save(file){
        try{
            await fs.promises.rename(
                path.resolve(uploadConfigs.TMP_FOLDER, file),
                path.resolve(uploadConfigs.UPLOAD_FOLDER, file)
            )
        }catch{
            throw new AppError("Failed to save the file!")
        }
    }
}


module.exports = DiskStorage;