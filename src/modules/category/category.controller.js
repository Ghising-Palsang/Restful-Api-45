const slugify = require("slugify");
const fileUploadSvc = require("../../services/fileupload.service");
const CategoryModel = require("./category.model");

class CategoryController {
  storeCategory = async (req, res, next) => {
    try {
      const payload = req.body;
      if (req.file) {
        payload.image = await fileUploadSvc.svc.fileUpload(
          req.file.path,
          "category/"
        );
      }

      payload.slug = slugify(payload.name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
      });

      // when setting parentId empty in payload it comes as '' . and it refers to notNull.
      // so we have to mapping for it

      if (!payload.parentId) {
        payload.parentId = null;
      }

      //   console.log(payload.slug)
      //   console.log(payload)
      const category = new CategoryModel(payload);
      await category.save();

      res.json({
        data: category,
        message: "Category Created successfully",
        name: "CATEGORY_CREATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllCategories = async (req, res, next) => {
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

      const data = await CategoryModel.find(filter)
        .populate("parentId", ["_id", "name", "slug", "status", "image"])
        .sort({ createdAt: "desc" })
        .limit(limit)
        .skip(skip);

      let total = await CategoryModel.countDocuments(filter); // for e.g if the filter is like book , it counts how many documents have name book with case insensitivity

      res.json({
        data: data,
        message: "List of Categorys",
        name: "CATEGORY_LISTS",
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

  getCategoryDetailById = async (req, res, next) => {
    try {
      const categoryDetail = await CategoryModel.findOne({
        _id: req.params.id,
      }).populate("parentId", ["_id", "name", "slug", "status", "image"]);

      if (!categoryDetail) {
        throw {
          code: 422,
          message: "Category detail doesnot exist",
          status: "CATEGORY_NOT_FOUND",
        };
      }
      res.json({
        data: categoryDetail,
        message: "Category Detail",
        name: "Success",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateCategory = async (req, res, next) => {
    try {
      const categoryDetail = await CategoryModel.findOne({
        _id: req.params.id,
      });

      if (!categoryDetail) {
        throw {
          code: 422,
          message: "Category detail not found",
          status: "CATEGORY_DETAIL_NOT_FOUND_ERR",
          options: null,
        };
      }

      const payload = req.body;
      if (req.file) {
        payload.image = await fileUploadSvc.svc.fileUpload(
          req.file.path,
          "/category"
        );
      } else {
        payload.image = categoryDetail.image;
      }

      if(!payload.parentId){
        payload.parentId = null
      }

      let category = await CategoryModel.findOneAndUpdate(
        { _id: categoryDetail.id },
        { $set: payload },
        { new: true }
      );

      res.json({
        data: category,
        message: "Category Updated",
        name: "CATEGORY_UPDATE_SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteById = async (req, res, next) => {
    try {
      const categoryDetail = await CategoryModel.findOne({
        _id: req.params.id,
      });

      if (!categoryDetail) {
        throw {
          code: 422,
          message: "Category detail not found",
          name: "CATEGORY_NOT_FOUND",
          options: null,
        };
      }

      const del = await CategoryModel.findOneAndDelete({
        _id: categoryDetail._id,
      });
      res.json({
        data: del,
        message: "Category deleted",
        name: "CATEGORY_DELETED",
        options: null,
      });
    } catch (error) {
      next(error);
    }
  };
}

const categoryCtrl = new CategoryController();
module.exports = categoryCtrl;
