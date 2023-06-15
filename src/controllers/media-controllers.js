import multer from "multer";
import httpStatus from "http-status";
import fs from 'fs';
import path from "path";
import utility from "../services/utility";
import repositories from "../repositories";
import config from "../config/config";
import sharp from "sharp";
const { media } = repositories;

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const { mediaType, mediaFor } = req.params;
        cb(null, `public/uploads/${mediaType}/${mediaFor}/`);
    },

});


const uploadfiles = multer({
    storage: config.app.mediaStorage === 'local' ? storage : null,
    fileFilter: (request, file, callback) => {
        const ext = path.extname(file.originalname);
        console.log("EXT : " + ext)
        let fileFormate = [];
        if (request.params.mediaType === 'image')
            fileFormate = ['.img', '.jpeg', '.jpg', '.gif'];
        else if (request.params.mediaType === 'video')
            fileFormate = ['.mp4', '.mkv'];
        else if (request.params.mediaType === 'audio')
            fileFormate = ['.mp3', '.aac', '.m4a'];
        else if (request.params.mediaType === 'file')
            fileFormate = ['.pdf', '.doc', '.docx'];
        else if (request.params.mediaType === 'media')
            fileFormate = [
                '.png',
                '.jpg',
                '.gif',
                '.aac',
                '.m4a',
                '.mp3',
                '.jpeg',
                '.pdf',
                '.doc',
                '.docx',
                '.mp4',
            ]
        console.log(fileFormate + "**********");
        if (!fileFormate.indexOf(ext.toLocaleLowerCase()) === -1) {
            return callback(new Error(`Allowed file formate ${fileFormate.toString()}`))
        }
        callback(null, true);
    }
})


export default {
    async uploadMedia(request, response, next) {
        try {
            const { params } = request;
            const { mediaType } = params;
            params.mediaType = mediaType;
            console.log("Media type : " + mediaType);
            console.log("Params : " + params);
            uploadfiles.single('image')(request, response, async (error) => {
                if (!error) {
                    const result = await media.createFile(request);
                }else{
                    console.log(error)
                }
                next();
            });
        } catch (error) {
            console.log(error);
            throw Error(error);
        }
    }
}