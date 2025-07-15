const { KhaltiConfig, AppConfig } = require("../../config/config");
const { OrderDetailStatus } = require("../../config/constants");
const { generateRandomString } = require("../../utilities/helpers");
const OrderDetailModel = require("../order-detail/order-detail.model");
const OrderModel = require("./order.model");


class OrderController {
  checkout = async (req, res, next) => {
    try {
      const loggedInUser = req.loggedInUser;
      const details = req.body.details; // gives array
    
      console.log("logged in user = ", loggedInUser)

      // OrderDetails is Cart data
      const OrderDetails = await OrderDetailModel.find({
        buyer: loggedInUser._id,
        _id: {$in: details}, // from array
        order: {$eq: null},
      });

      console.log("orderDetail",OrderDetails)

      if (!OrderDetails) {
        throw {
          code: 422,
          message: "Order Detail not Found",
          name: "ORDER_DETAILS_NOT_FOUND",
        };
      }

      // Converting Cart data in Order data
      // What we want to add in order from order model. this is order sets

      const orderDetailsIds = [];
      let subTotal = 0;

      OrderDetails.map((item) => {
        subTotal += item.total;
        orderDetailsIds.push(item._id);
       
      });

      
      const orderObj = {
        buyer: loggedInUser._id,
        code: generateRandomString(15),
        details: orderDetailsIds,
        subTotal: subTotal,
        deliveryCharge: 10000,
        total: subTotal + 10000,
        status: OrderDetailStatus.PENDING,
        createdBy: loggedInUser._id,
      };

      const order = new OrderModel(orderObj);
      await order.save();

      await OrderDetailModel.updateMany(
        {
          _id: { $in: orderDetailsIds },
        },
        {
          $set: {
            order: order._id,
            status: OrderDetailStatus.ORDERED,
          },
        }
      );

      res.json({
        data: order,
        message: "Order Checkouted",
        status: "ORDER_CHECKEDOUT",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listMyOrders = async (req, res, next) => {
    try {
      const loggedInUser = req.loggedInUser;
      console.log(loggedInUser)
      // pagination
      let page = +req.query.page || 1;
      let limit = +req.query.limit || 10;
      let skip = (page - 1) * limit;

      const orderList = await OrderModel.find({
        buyer: loggedInUser._id,
      })
        .populate("buyer",["_id","name","email","role","address","gender","image"])
        .populate("details")
        .populate("createdBy",["_id","name","email","role","address","gender","image"])
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(limit);

      const totalCount = await OrderModel.countDocuments({
        buyer: loggedInUser._id,
      });

      res.json({
        data: orderList,
        message: "Your Order lists",
        status: "ORDER_LIST",
        options: {
          page: page,
          limit: limit,
          total: totalCount,
        },
      });
    } catch (exception) {
      next(exception);
    }
  };

  initiatePayment = async(req, res, next) =>{
    try{
      const loggedInUser = req.loggedInUser;
      const orderInfo = await OrderModel.findOne({
        buyer: loggedInUser._id,
        _id: req.params.orderId,
        status: OrderDetailStatus.PENDING
      });

      if(!orderInfo){
        throw{
          code: 422,
          message: "Order info not found",
          name: "ORDER_INFO_NOT_FOUND",
        }
      }

      let response = await fetch(`${KhaltiConfig.baseUrl+ "epayment/initiate/"}`,{
        method: "POST",
        headers: {
          Authorization: `Key ${KhaltiConfig.secretKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ // while posting we make it string
          return_url: AppConfig.feUrl+"payment-success",
          website_url:AppConfig.feUrl,
          amount: orderInfo.total,
          purchase_order_id: orderInfo.code,
          purchase_order_name: "BIN-commerce Product"
        })
      })
      

      response = await response.json() // here we make it json object
      console.log(response)
      res.json({
        data: response,
        message: "Payment Started...",
        status: "PAYMENT_INITIALIZED",
        options: null,
      })


    }catch(exception){
      next(exception)
    }
  }
}

const orderCtrl = new OrderController();
module.exports = orderCtrl;
