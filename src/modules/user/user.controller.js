const UserModel = require("./user.model");

class UserController {
  listAllUsers = async (req, res, next) => {
    try {
      let filter = {
        _id: { $ne: req.loggedInUser._id },
      };

      if (req.query.role) {
        filter = {
          ...filter,
          role: req.query.role,
        };
      }

      if (req.query.search) {
        filter = {
          ...filter,
          $or: [
            { name: new RegExp(req.query.search, "i") },
            { email: new RegExp(req.query.search, "i") },
            { address: new RegExp(req.query.search, "i") },
            { phone: new RegExp(req.query.search, "i") },
          ],
        };
      }

      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const skip = (page - 1) * limit;


      const userLists = await UserModel.find(filter)
      .sort({name: "asc"})
      .skip(skip)
      .limit(limit)

      const total = await UserModel.countDocuments(filter)
      
      
      res.json({
        data: userLists,
        message: "User Lists",
        status: "USER_LIST",
        options: {
            pagination: {
                page: page,
                limit: limit,
                totalCount: total
            }
        }
      })
    } catch (exception) {}
  };
}

const userCtrl = new UserController();
module.exports = userCtrl;
