class ChatController {
  storeChat = async (req, res, next) => {
    try {
      const payload = req.body;
      payload.sender = req.loggedInUser._id;

      const chat = new ChatModel(payload);
      await chat.save();

      res.json({
        data: chat,
        message: "Your msg has been sent",
        status: "MSG_SENT",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getChatDetail = async (req, res, next) => {
    try {
      const loggedInUser = req.loggedInUser;
      const user = req.params.userId;

      const page = +req.query.page || 1;
      const limit = +req.query.limit || 5;
      const skip = (page - 1) * limit;

      const filter = {
        $or: [
          { sender: loggedInUser._id, receiver: user },
          { sender: user, receiver: loggedInUser._id },
        ],
      };

    

      const chatDetail = await ChatModel.find(filter)
        .populate("receiver", ["_id", "name", "role", "email", "image"])
        .populate("sender", ["_id", "name", "role", "email", "image"])
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(limit)

    const rows = await ChatModel.countDocuments(filter)

    res.json({
        data: chatDetail,
        message: "Your Chat list",
        status: "CHAT_LIST",
        options: {
            pagination: {
                page: page,
                limit: limit,
                totalCount: rows
            }
        }
    })

      
    } catch (exception) {
      next(exception);
    }
  };
}

const chatCtrl = new ChatController();
module.exports = chatCtrl;
