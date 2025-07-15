const { OrderDetailStatus } = require("../../config/constants");
const ProductModel = require("../product/product.model");
const OrderDetailModel = require("./order-detail.model");

class OrderDetailController {
  addToCart = async (req, res, next) => {
    try {
      const loggedInUser = req.loggedInUser;
      const { product, quantity } = req.body;

      // validating cart
      const productDetail = await ProductModel.findById(product);
      if (!productDetail) {
        throw {
          code: 422,
          message: "Product Detail not Found",
          name: "PRODUCT_DETAIL_NOT_FOUND",
          options: null,
        };
      }

      //existingCart
      let existingCart = await OrderDetailModel.findOne({
        buyer: loggedInUser._id,
        product: productDetail._id,
        status: OrderDetailStatus.PENDING,
        order: { $eq: null },
      });

      if (existingCart) {
        //update cart
        (existingCart.quantity = existingCart.quantity + quantity),
          (existingCart.price = productDetail.afterDiscount),
          (existingCart.total =
            (existingCart.quantity + quantity) * productDetail.afterDiscount),
          await existingCart.save();
      } else {
        // new Cart
        existingCart = new OrderDetailModel({
          buyer: req.loggedInUser._id,
          product: productDetail._id,
          order: null,
          quantity: quantity,
          price: productDetail.afterDiscount,
          total: quantity * productDetail.afterDiscount,
          seller: productDetail.seller,
          status: OrderDetailStatus.PENDING,
        });
        await existingCart.save();
      }

      res.json({
        data: existingCart,
        message: "Product added to Cart",
        status: "PRODUCT_ADDED_IN_CART",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getMyCartList = async (req, res, next) => {
    try {
      const loggedInUser = req.loggedInUser; // this contains detail of loggedInUser
      const orderDetail = await OrderDetailModel.find({
        buyer: loggedInUser._id,
        status: OrderDetailStatus.PENDING,
        order: { $eq: null },
      })
        .populate("product")
        .populate("seller")
        .populate("buyer")

      if (!orderDetail) {
        throw {
          code: 422,
          message: "Order not Found",
          name: "ORDER_NOT_FOUND",
          options: null,
        };
      }

      res.json({
        data: orderDetail,
        message: "Your Order Details",
        status: "ORDER_DETAILS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateMyCart = async (req, res, next) => {
    try {
      const loggedInUser = req.loggedInUser;
      const orderDetail = await OrderDetailModel.findOne({
        buyer: loggedInUser._id,
        _id: req.params.orderDetailId,
      });
      const quantity = +req.body.quantity;

      if (!orderDetail) {
        throw {
          code: 422,
          message: "Order Detail Not Found",
          name: "ORDER_DETAIL_NOT_FOUND",
          options: null,
        };
      }

      const productDetail = await ProductModel.findOne({
        _id: orderDetail.product,
      });

      if (!productDetail) {
        throw {
          code: 422,
          message: "Product Not Found",
          name: "PRODUCT_NOT_FOUND",
          options: null,
        };
      }

      if (quantity >= orderDetail.quantity || quantity <= 0) {
        await OrderDetailModel.findOneAndDelete({
          _id: orderDetail.id,
        });

        res.json({
          data: null,
          message: "Cart item removed",
          status: "ITEM_REMOVED",
          options:null,
        })
      } else {
        orderDetail.quantity = orderDetail.quantity - quantity;
        orderDetail.price = productDetail.price;
        orderDetail.afterDiscount = productDetail.price - productDetail.price * productDetail.discount/100
        orderDetail.total = orderDetail.quantity * orderDetail.afterDiscount;

        await orderDetail.save()

        res.json({
          data: orderDetail,
          message: "Cart item Updated",
          status: "CART_UPDATED",
          options:null,
        })
      }
    } catch (exception) {
      next(exception);
    }
  };
}

const orderDetailCtrl = new OrderDetailController();
module.exports = orderDetailCtrl;
