const SessionModel = require("./auth.model");

class AuthService {
  async storeSession(data) {
    try {
      const session = new SessionModel(data);
      return await session.save(); // Save the session to the database
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRow(filter) {
   try{
    return await  SessionModel.findOne(filter);
   }catch(exception){
    throw(exception)
   }
  }
}

const authSvc = new AuthService();
module.exports = authSvc;
