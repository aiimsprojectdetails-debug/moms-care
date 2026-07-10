export const uploadImage = async (req, res) => {
  try {
    console.log("========== UPLOAD ==========");
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded.",
      });
    }

    return res.status(200).json({
      success: true,
      imageUrl: req.file.path,
    });
  } catch (error) {
  console.error("Upload Error:");
  console.error(error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};