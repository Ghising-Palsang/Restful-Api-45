const { AppConfig } = require("../config/config");
const authSvc = require("../modules/auth/auth.service");
const jwt = require("jsonwebtoken");
const userSvc = require("../modules/user/user.service");

const logInCheck = async (req, res, next) => {
  try {
    let token = req.headers["authorization"] || null;
    if (!token) {
      throw {
        code: 401,
        message: "Unauthorized",
        status: "UNAUTHORIZED",
      };
    }
    // console.log(token)
    token = token.replace("Bearer", "").trim();
    const sessionData = await authSvc.getSingleRow({
      accessToken: token,
    });
    if (!sessionData) {
      throw {
        code: 401,
        message: "Token not found",
        status: "INVALID_TOKEN",
      };
    }

    const payload = jwt.verify(token, AppConfig.jwtSecret);
    const userDetail = await userSvc.getSingleUserByFilter({
      _id: payload.sub,
    });

    if (!userDetail) {
      throw {
        code: 403,
        message: "Your account doesnot exist anymore",
        status: "ACCOUNT_NOT_FOUND",
      };
    }

    req.loggedInUser = await userSvc.getUserPublicProfile(userDetail)
    // the userDetail which is in above contains logged in userDetails and it has both confidential and non-confidential/public data. 
    // But we should send confidential data to the client because it make our server prone to hacking.
    // so using userSvc.getUserPublicProfile we take userDetail as arguments and filter out public data from userData.
    // and make sure we don't send confidential data.

    next();
  } catch (exception) {
    next(exception);
  }
};

module.exports = logInCheck;
