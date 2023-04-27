const controller = require("../controllers/auction_gallery.controller");
const path = require('path')
const multer = require('multer');
const storageFile = multer.diskStorage({
  destination: './public/product_gallery',
  filename: function (req, file, fn) {
      fn(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname))
  }
})

// Create multer for store images path
var upload = multer({ storage: storageFile }).fields([{ name: 'product_gallery', maxCount: 1 }])

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auction/add_auc_gallery", upload,controller.validate('createAucGallery'), controller.create);
  app.get("/auction/all_auc_gallery", controller.findAll);
  app.get("/auction/active_auc_gallery", controller.findActive);
  app.get("/auction/extract_auc_gallery/:id", controller.findOne);
  app.put("/auction/update_auc_gallery/:id", upload,controller.validate('updateAucGallery'), controller.update);
  app.delete("/auction/delete_auc_gallery/:id", controller.delete);
};
