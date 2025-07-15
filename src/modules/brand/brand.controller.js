const slugify = require("slugify");
const fileUploadSvc = require("../../services/fileupload.service");
const BrandModel = require("./brand.model");


class BrandController {
  storeBrand = async (req, res, next) => {
    try {
      const payload = req.body;
      if (req.file) {
        payload.logo = await fileUploadSvc.svc.fileUpload(
          req.file.path,
          "brand/"
        );
      }

      payload.slug = slugify(payload.name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
      });

      //   console.log(payload.slug)
      //   console.log(payload)
      const brand = new BrandModel(payload);
      await brand.save();

      res.json({
        data: brand,
        message: "Brand Created successfully",
        name: "BRAND_CREATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllBrands = async (req, res, next) => {
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

      const data = await BrandModel.find(filter)
        .sort({ createdAt: "desc" })
        .limit(limit)
        .skip(skip);

      let total = await BrandModel.countDocuments(filter); // for e.g if the filter is like book , it counts how many documents have name book with case insensitivity

      res.json({
        data: data,
        message: "List of Brands",
        name: "BRAND_LISTS",
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

  getBrandDetailById = async (req, res, next) => {
    try {
      const brandDetail = await BrandModel.findOne({
        _id: req.params.id,
      });

      if (!brandDetail) {
        throw {
          code: 422,
          message: "Brand detail doesnot exist",
          status: "BRAND_NOT_FOUND",
        };
      }
      res.json({
        data: brandDetail,
        message: "Brand Detail",
        name: "Success",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateBrand = async (req, res, next) => {
    try {
      const brandDetail = await BrandModel.findOne({
        _id: req.params.id,
      });

      if (!brandDetail) {
        throw {
          code: 422,
          message: "Brand detail not found",
          status: "BRAND_DETAIL_NOT_FOUND_ERR",
          options: null,
        };
      }

      const payload = req.body;
      if (req.file) {
        payload.logo = await fileUploadSvc.svc.fileUpload(
          req.file.path,
          "/brand"
        );
      } else {
        payload.logo = brandDetail.logo;
      }

      let brand = await BrandModel.findOneAndUpdate(
        { _id: brandDetail.id },
        { $set: payload },
        { new: true }
      );

      res.json({
        data: brand,
        message: "Brand Updated",
        name: "BRAND_UPDATE_SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteById = async(req, res, next) => {
    try{    
      const brandDetail = await BrandModel.findOne({
        _id: req.params.id
      }) 

      if(!brandDetail){
        throw{
          code: 422,
          message: "Brand detail not found",
          name: "BRAND_NOT_FOUND",
          options: null,
        }
      }

      const del = await BrandModel.findOneAndDelete({
        _id: brandDetail._id
      })
      res.json({
        data: del,
        message: "Brand deleted",
        name: "BRAND_DELETED",
        options:null,
      })
    }catch(error){
      next(error)
    }
  }
}

const brandCtrl = new BrandController();
module.exports = brandCtrl;
