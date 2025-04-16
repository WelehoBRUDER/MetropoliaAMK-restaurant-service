import sharp from "sharp";
import multer from "multer";
import fs from "fs";

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  let extension = "jpg";
  if (req.file.mimetype === "image/png") {
    // if (req.file.mimetype.includes('/png')) {
    extension = "png";
  }
  const resizedImaged = await sharp(req.file.path)
    .resize(160, 160)
    .toFile(`${req.file.path}_thumb.${extension}`);
  if (resizedImaged) {
    console.log("Thumbnail created:", resizedImaged);
  }
  // Delete original file
  fs.unlink(req.file.path, (err) => {
    if (err) console.error("Error deleting original image:", err);
  });
  next();
};

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    // allow only images and videos
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      // accept file
      cb(null, true);
    } else {
      // reject file
      cb(null, false);
    }
  },
});

export {createThumbnail, upload};
