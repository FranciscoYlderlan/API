import uploadsConfig from "./../configs/uploads.js";
import path from 'path';
import fs from 'fs'
export class DiskStorage {
    async saveFile(filename){
        await fs.promises.rename(
            path.resolve(uploadsConfig.TMP_FOLDER, filename),
            path.resolve(uploadsConfig.UPLOADS_FOLDER, filename)
        )
    }
    async deleteFile(filename){
        const filepath = path.resolve(uploadsConfig.TMP_FOLDER, filename);
        try {
          await fs.promises.stat(filepath);  
        } catch (error) {
            console.log("Falha ao procurar arquivo: ", error);
        }
        await fs.promises.unlink(filepath);
    }
}