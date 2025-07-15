// Making status and assigning acitve and inactive value in different file because if we have typo error
// doing this it will cause problem later on that is why to prevent that we do like this.

const Status = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

const UserRoles = {
  ADMIN: "admin",
  SELLER: "seller",
  CUSTOMER: "customer",
};

const Gender = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
};

const OrderDetailStatus = {
  PENDING: "pending",
  ORDERED: "ordered",
  COMPLETED: "completed",
  PAID: "paid"
};

module.exports = { Status, UserRoles, Gender, OrderDetailStatus };
