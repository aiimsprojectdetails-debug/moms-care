import multer from "multer";

console.log("multer =", multer);

const upload = multer();

console.log("upload =", upload);
console.log("typeof upload.single =", typeof upload.single);

export default upload;