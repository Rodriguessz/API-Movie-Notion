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

            return file;
        }catch{
            throw new AppError("Failed to save the file!")
        }
    }

    async delete(file){

        const filePath = path.resolve(uploadConfigs.UPLOAD_FOLDER, file) 

        try{   
            //Checks infos about the file. Any error, catch and throw to the user.
            const fileInformations = await fs.promises.stat(filePath);        
        }catch{
            throw new AppError("Failed to delete the file!")
        }

        //Delete the file
        await fs.promises.unlink(filePath);
    }
}


module.exports = DiskStorage;