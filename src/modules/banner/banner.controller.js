const fileUploadSvc = require("../../services/fileupload.service");
const BannerModel = require("./banner.model");

class BannerController {
  addBanner = async (req, res, next) => {
    try {
      const bannerData = {
        ...req.body,
      };

      if (!req.file) {
        throw {
          code: 422,
          message: "Detail not found",
          detail: { image: "Image is required" },
          name: "VALIDATION_FAILED_ERR",
        };
      }

      bannerData.image = await fileUploadSvc.svc.fileUpload(
        req.file.path,
        "banner/"
      );

      // store
      const banner = await BannerModel.create(bannerData);
      console.log(banner);
      res.json({
        data: banner,
        message: "Banner Created",
        status: "BANNER_CREATED_SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllBanners = async (req, res, next) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let skip = (page - 1) * limit;

      let filter = {};

      if (req.query.status) {
        filter = {
          ...filter,
          status: req.query.status,
        };
      }

      if (req.query.search) {
        filter = {
          ...filter,
          title: { [Op.iLike]: `%${req.query.search}%` },  // Op.iLike is an LIKE operator of sql for searching and %% looks for keyword that matches anywhere. Just like in mySql.
          url: { [Op.iLike]: `%${req.query.search}%` },
        };
      }

      const { rows, count } = await BannerModel.findAndCountAll({
        where: filter,
        order: [["createdAt", "desc"]],
        offset: skip,
        limit: limit,
      });

      res.json({
        data: rows,
        message: "Bannner Listed",
        status: "BANNER_LIST_SUCCESS",
        options: {
          pagination: {
            page: page,
            limit: limit,
            count: count,
          },
        },
      });
    } catch (exception) {
      next(exception);
    }
  };

  getSingleRows = async (req, res, next) => {
    try {
      const data = await BannerModel.findOne({
        where: {
          _id: req.params.id,
        },
      });

      if (!data) {
        throw {
          code: 422,
          message: "Data not found",
          name: "DATA_NOT_FOUND_ERR",
        };
      }

      res.json({
        data: data,
        message: "Banner Listed By Id",
        status: "BANNER_LISTED_By_ID",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateBannerById = async (req, res, next) => {
    try {
      const data = await BannerModel.findOne({
        where: {
          _id: req.params.id,
        },
      });

      if (!data) {
        throw {
          code: 422,
          message: "Data not found",
          name: "DATA_NOT_FOUND_ERR",
        };
      }

      const payload = req.body;

      if (req.file) {
        payload.image = fileUploadSvc.svc.fileUpload(req.file.path, "/banner");
      } else {
        payload.image = data.image;
      }

      await BannerModel.update(payload, {
        where: {
          _id: data._id,
        },
      });

      res.json({
        data: data,
        message: "Banner Listed By Id",
        status: "BANNER_LISTED_By_ID",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteBannerById = async (req, res, next) => {
    try {
      const data = await BannerModel.findOne({
        where: {
          _id: req.params.id,
        },
      });

      if (!data) {
        throw {
          code: 422,
          message: "Data not found",
          name: "DATA_NOT_FOUND_ERR",
        };
      }

      await BannerModel.destroy({
        where: {
          _id: data._id,
        },
      });

      res.json({
        data: null,
        message: "Banner Deleted",
        status: "BANNER_DELETED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllForHomeBanners = async (req, res, next) => {
    try {
      let filter = {
        status: "active",
      };

      if (req.query.search) {
        filter = {
          ...filter,
          title: { [Op.iLike]: `%${req.query.search}%` },
          url: { [Op.iLike]: `%${req.query.search}%` },
        };
      }

      const rows = await BannerModel.findAll({
        where: filter,
        order: [["createdAt", "desc"]],
        offset: 0,
        limit: 10,
      });

      res.json({
        data: rows,
        message: "Bannner Listed",
        status: "BANNER_LIST_SUCCESS",
        options: {
          pagination: {
            page: page,
            limit: limit,
            count: count,
          },
        },
      });
    } catch (exception) {
      next(exception);
    }
  };
}

const bannerCtrl = new BannerController();
module.exports = bannerCtrl;
