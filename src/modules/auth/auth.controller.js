const { AppConfig } = require("../../config/config");
const { Status } = require("../../config/constants");
const userSvc = require("../user/user.service");
const authEmailSvc = require("./auth.mail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authSvc = require("./auth.service");


class AuthCtrl {
  userRegister = async (req, res, next) => {
    try {
      const data = await userSvc.transfromUserCreateData(req);
      const user = await userSvc.CreateUser(data); // Insert operation
      await authEmailSvc.notifyAccountRegister(user);

      //after this either db or sending mail

      //Activation through email
      // link based activation
      // After DB store
      // Notify data OTP, link

      //used during login
      // bcrypt.compareSync(data.confirmPassword, data.password) // we get boolean value from this.

      //logical context develop
      //respond
      // Http response code
      //1xx -- 599
      // 200 range => successfull
      // 200, 201,204,208,219
      //300 range response code => Redirectional
      // 400 => Client side error
      // 500 => server error
      res.status(200).json({
        data: user,
        message:
          "Your acccount has been created. please check your email for further process",
        status: "OK",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getUserProfileByUserId = (req, res, next) => {
    const params = req.params;
    const query = req.query;

    res.json({
      data: {
        params,
        query,
      },
      message: "User Detail",
      status: "OK",
      options: null,
    });
  };

  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userDetail = await userSvc.getSingleUserByFilter({
        email: email,
      });
      // console.log("Fetched user:", userDetail);

      if (!userDetail) {
        throw {
          code: 403,
          message: "User not found",
          name: "USER_NOT_FOUND_ERR",
        };
      }

      // console.log("User status:", userDetail.status);
      // console.log("Expected:", Status.ACTIVE);

      // now we need to check password and activation status
      // if activation status is not active then we will not allow user to login => access denied 403
      if (userDetail.status !== Status.ACTIVE) {
        throw {
          code: 422,
          message: "User account is not active, please activate your account",
          name: "USER_NOT_ACTIVE_ERR",
        };
      }

      // if activation status is active then we will check password
      if (!bcrypt.compareSync(password, userDetail.password)) {
        throw {
          code: 422,
          message: "Invalid password",
          name: "INVALID_PASSWORD_ERR",
        };
      }
      
      // we have successfully logged in user after checking all conditions email, password and activation status
      // after this we also get private route which we have to authorize so we need jwt token for it

      const accessToken = jwt.sign({sub: userDetail._id, typ:"Bearer"}, AppConfig.jwtSecret, {expiresIn: '1h'})
      const refreshToken = jwt.sign({sub: userDetail._id, typ:"Refresh"}, AppConfig.jwtSecret, {expiresIn: '7d'})

      //logout  
      const sessionData = {
        user: userDetail._id,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };

      await authSvc.storeSession(sessionData);

      res.json({
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        }
        , message: "User logged in successfully",
        status: " LOGIN_SUCCESS", 
        options: null,

      })



    } catch (exception) {
      next(exception);
    }
  };

  activateRegisteredUser = async (req, res, next) => {
    // Here you would typically verify the token and activate the user account
    try {
      const token = req.params.token;
      const userDetail = await userSvc.getSingleUserByFilter({
        activationToken: token,
      });
      if (!userDetail) {
        throw {
          code: 422,
          message: "User not found",
          name: "USER_ACTIVATION_FAILED_ERR",
        };
      }

      const today = Date.now();
      const expiryTime = userDetail.expiryTime.getTime();

      if (today > expiryTime) {
        await userSvc.updateSingleUserByFilter(
          { _id: userDetail._id },
          {
            activationToken: generateRandomString(150),
            expiryTime: new Date(Date.now() + 3 * 3600 * 1000), // 3 hours from now
          }
        );
        await authEmailSvc.notifyNewActivationLink(userDetail);
      } else {
        await userSvc.updateSingleUserByFilter(
          { _id: userDetail._id },
          {
            activationToken: null,
            expiryTime: null,
            status: Status.ACTIVE,
          }
        );
        // TODO: Send an welcome email to notify user about successful activation
        await authEmailSvc.notifyActivationWelcomeLink(userDetail);
        res.json({
          data: null,
          message: "Your account has been activated successfully",
          status: "USER_ACTIVATED",
          options: null,
        });
      }

      res.json({
        data: null,
        message:
          "A new activation link has been sent to your email, as previous one has expired",
        status: "OK",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  logoutUser = (req, res, next) => {
    res.json({
      data: "any",
      message: "User logged out",
      status: "NEW_LINK",
      options: null,
    });
  };

  forgotPasswordRequest = (req, res, next) => {
    res.json({
      data: "any",
      message: "Forgot Password request sent",
      status: "OK",
      options: null,
    });
  };


  getLoggedInUser = async(req, res, next) =>{
    try {
      res.json({
        data: req.loggedInUser,
        message:"Your Profile",
        status: "PROFILE_FETCHED",
        options: null,

      })
    } catch (exception) {
      next(exception)
    }
  }


  updateMyProfile = async(req, res, next) => {
    try{

    }catch(exception){
      throw exception
    }
  }

  
}

const authCtrl = new AuthCtrl();
module.exports = authCtrl;
