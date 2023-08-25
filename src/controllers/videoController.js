const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const { uploadToS3 } = require('../utils/s3');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('video');

const resizeVideo = (inputBuffer) => {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(inputBuffer)
            .videoCodec('libx264')
            .size('640x480')
            .toFormat('mp4')
            .on('end', () => resolve())
            .on('error', (error) => reject(error))
            .toBuffer();
    });
};

const uploadVideo = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'File upload error.' });
            } else if (err) {
                return res.status(500).json({ message: 'Internal server error.' });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'No video file provided.' });
            }

            const resizedVideoBuffer = await resizeVideo(req.file.buffer);
            const uploadedVideoUrl = await uploadToS3(resizedVideoBuffer, req.file.originalname);

            return res.status(200).json({ message: 'Video uploaded and resized.', videoUrl: uploadedVideoUrl });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { uploadVideo };
