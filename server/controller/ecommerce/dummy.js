cart {
    _id: new ObjectId("659d4f1ed51b0938945ec117"),
    items: [
      {
        _id: new ObjectId("659d4f1ed51b0938945ec117"),
        coupon: null,
        product: [Object],
        quantity: 1
      }
    ],
    cartTotal: 2222,
    discountedTotal: 2222
  }
  newCart {
    items: [ 
        { 
            quantity: 1, 
            _id: new ObjectId("659d4f1ed51b0938945ec117") 
        }
    ],
    coupon: null,
    totalCartPrice: 2222,
    discountedCartPrice: 2222,
    _id: new ObjectId("659d4f1ed51b0938945ec117")
  }
  updatedCart {
    _id: new ObjectId("659d4f1ed51b0938945ec117"),
    owner: new ObjectId("659d4f1dd51b0938945ec111"),
    items: [
      {
        productId: new ObjectId("65b3bb577580337d2fd7de0e"),
        quantity: 1,
        _id: new ObjectId("65d64377bb327a34267acaa6")
      }
    ],
    coupon: null,
    createdAt: 2024-01-09T13:50:22.759Z,
    updatedAt: 2024-02-21T18:50:03.932Z,
    __v: 29,
    discountedCartPrice: 3220,
    totalCartPrice: 3220
  }