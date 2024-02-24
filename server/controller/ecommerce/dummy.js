// const transporter = nodemailer.createTransport({
//   // host: "smtp.gmail.com",
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "nova.barton64@ethereal.email",
//     pass: "DWv34qQYaGmjBZz7gh",
//   },
// });

{
    "_id": "65d8ef6c93796f26a55c882f",
    "orderPrice": 2222,
    "discountedOrderPrice": 2222,
    "coupon": null,
    "customer": "659d4f1dd51b0938945ec111",
    "items": [
        {
            "productId": "65b3bb577580337d2fd7de0e",
            "quantity": 1,
            "_id": "65d8d74adab24643438b117d"
        }
    ],
    "address": "65d8ef0493796f26a55c881c",
    "status": "PENDING",
    "paymentProvider": "RAZORPAY",
    "paymentId": "order_NeQwbLK7ixdrXx",
    "isPaymentDone": false,
    "createdAt": "2024-02-23T19:18:04.044Z",
    "updatedAt": "2024-02-23T19:18:04.044Z",
    "__v": 0
},

this is what i get when i try to get the order details
by command :    const userOrders = await EcomOrder.find({ customer: _id });
"but i want to populate the product insite the items array which has id as 
productId and the address insite the address field which has id as address"


