const bcrypt = require("bcryptjs");
const { generateRandomString } = require("../../utilities/helpers");
const UserModel = require("./user.model");
const fileUploadSvc = require("../../services/fileupload.service");
const Status = require("../../config/constants").Status;

class UserService {
  async transfromUserCreateData(req) {
    try {
      const data = req.body;

      // file
      if (req.file) {
        data.image = await fileUploadSvc.svc.fileUpload(req.file.path, "/user");
      }

      // used before logging in
      let salt = bcrypt.genSaltSync(12);
      data.password = bcrypt.hashSync(data.password, salt);

      // Activation process
      data.activationToken = generateRandomString(); //JWT token / random string
      data.expiryTime = new Date(Date.now() + 3 * 3600 * 1000); // hour into second and into millisecond
      data.status = Status.ACTIVE;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async CreateUser(data) {
    try {
      const userObj = new UserModel(data);
      return await userObj.save(); // Save the user to the database //Insert operation
    } catch (exception) {
      throw exception;
    }
  }

  getSingleUserByFilter = async (filter) => {
    try {
      const user = await UserModel.findOne(filter);
      return user;
    } catch (exception) {
      throw exception;
    }
  };

  updateSingleUserByFilter = async (filter, data) => {
    try {
      const user = await UserModel.findOneAndUpdate(
        filter,
        { $set: data },
        { new: true }
      );
      return user;
    } catch (exception) {
      throw exception;
    }
  };

  getUserPublicProfile = (userDetail) => {
    return {
      _id: userDetail._id,
      name: userDetail.name,
      email: userDetail.email,
      role: userDetail.role,
      status: userDetail.status,
      address: userDetail.address,
      gender: userDetail.gender,
      phone: userDetail.phone,
      image: userDetail.image
    };
  };
}

const userSvc = new UserService();
module.exports = userSvc;
