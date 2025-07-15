const slugify = require("slugify");
const fileUploadSvc = require("../../services/fileupload.service");
const ProductModel = require("./product.model");
const { generateRandomString } = require("../../utilities/helpers");


class ProductController {
  storeProduct = async (req, res, next) => {
    try {
      const payload = req.body;

      // if (req.file) {
      //   payload.images = await fileUploadSvc.svc.fileUpload(
      //     req.file.path,
      //     "product/"
      //   );
      // }

      payload.slug = slugify(payload.name + "-" + generateRandomString(10), {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
      });

      if (!payload.category) {
        payload.category = null;
      }

      if (!payload.brand) {
        payload.brand = null;
      }

      if(!payload.seller){
        payload.seller = req.loggedInUser._id
      }

      payload.price = payload.price * 100;
      payload.afterDiscount = payload.price - payload.price * payload.discount/100

      payload.images = []
      if(req.files){
        const uploadedImages = req.files.map((image)=>fileUploadSvc.svc.fileUpload(image.path, '/product'))
        const fileUploaded = await Promise.allSettled(uploadedImages)

        fileUploaded.forEach((uploadedImage)=>{
          if(uploadedImage.status === "fulfilled"){
            payload.images.push(uploadedImage.value)
          }
        })
      }


      const product = new ProductModel(payload);
      await product.save();

      res.json({
        data: product,
        message: "Product Created successfully",
        name: "PRODUCT_CREATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllProducts = async (req, res, next) => {
    try {
      let page = +req.query.page || 1;
      let limit = +req.query.limit || 10;

      // 100 data
      // 1 = 0-9 , 2 = 10-19, 3 = 20-29
      // as 1 page contains 10 items for now as limit is 10. so to skip a single page we need to skip those 10 items.
      let skip = (page - 1) * limit;

      let filter = {};

      if (req.query.search) {
        filter = {
          ...filter,
          name: new RegExp(req.query.search, "i"),
        };
      }

      const data = await ProductModel.find(filter)
        .populate("category",["_id","name","slug","status","image"])
        .populate("brand",["_id","name","slug","status","image"])
        .populate("seller",["_id","name","slug","status","image"])
        .sort({ createdAt: "desc" })
        .limit(limit)
        .skip(skip);

      let total = await ProductModel.countDocuments(filter); // for e.g if the filter is like book , it counts how many documents have name book with case insensitivity

      res.json({
        data: data,
        message: "List of Products",
        name: "PRODUCT_LISTS",
        options: {
          pagination: {
            current: page,
            total: total, // how many doc matches the given filter
            pageSize: limit,
          },
        },
      });
    } catch (exception) {
      next(exception);
    }
  };

  getProductDetailById = async (req, res, next) => {
    try {
      const productDetail = await ProductModel.findOne({
        _id: req.params.id,
      });

      if (!productDetail) {
        throw {
          code: 422,
          message: "Product detail doesnot exist",
          name: "PRODUCT_NOT_FOUND",
        };
      }
      res.json({
        data: productDetail,
        message: "Product Detail",
        name: "Success",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      const productDetail = await ProductModel.findOne({
        _id: req.params.id,
      });

      if (!productDetail) {
        throw {
          code: 422,
          message: "Product detail not found",
          name: "PRODUCT_DETAIL_NOT_FOUND_ERR",
          options: null,
        };
      }

      const payload = req.body;
      if (req.file) {
        payload.images = await fileUploadSvc.svc.fileUpload(
          req.file.path,
          "/product"
        );
      } else {
        payload.images = productDetail.images;
      }

      if(!payload.parentId){
        payload.parentId = null
      }

      payload.price = payload.price * 100

      let product = await ProductModel.findOneAndUpdate(
        { _id: productDetail.id },
        { $set: payload },
        { new: true }
      );

      res.json({
        data: product,
        message: "Product Updated",
        name: "PRODUCT_UPDATE_SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteById = async (req, res, next) => {
    try {
      const productDetail = await ProductModel.findOne({
        _id: req.params.id,
      });

      if (!productDetail) {
        throw {
          code: 422,
          message: "Product detail not found",
          name: "PRODUCT_NOT_FOUND",
          options: null,
        };
      }

      const del = await ProductModel.findOneAndDelete({
        _id: productDetail._id,
      });
      res.json({
        data: del,
        message: "Product deleted",
        name: "PRODUCT_DELETED",
        options: null,
      });
    } catch (error) {
      next(error);
    }
  };
}

const productCtrl = new ProductController();
module.exports = productCtrl;
