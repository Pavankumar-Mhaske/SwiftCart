// json
/*{
    "statusCode": 200,
    "data": {
        "_id": "653c9b8657eea8db8787a988",
        "order": {
            "_id": "653c9b8657eea8db8787a988",
            "orderPrice": 2450,
            "discountedOrderPrice": 2250,
            "coupon": {
                "_id": "65901ce83b469629aadfa546",
                "name": "dashera Coupon",
                "couponCode": "DASHERA"
            },
            "customer": {
                "_id": "6527f0f9a5cb3daee993580c",
                "email": "mhaskepavankumar@gmail.com"
            },
            "items": [
                {
                    "_id": "653bb760ecdcc0668e25a854",
                    "quantity": 2,
                    "product": {
                        "_id": "652a0ef29698649ffbddfb19",
                        "name": "Product 7",
                        "slug": "product-7",
                        "description": "Product description",
                        "price": 250,
                        "stock": 100,
                        "soldItems": 40,
                        "brand": "MI",
                        "mainImage": {
                            "_id": "652a0ef29698649ffbddfb18"
                        },
                        "owner": "6527f52c13315530d3e381dc",
                        "subImages": [],
                        "reviews": [],
                        "createdAt": "2023-10-14T03:45:54.367Z",
                        "updatedAt": "2023-10-28T13:51:13.871Z",
                        "__v": 0,
                        "colors": [
                            "653cedcf7d3bc7fc1be0efd5",
                            "653cee117d3bc7fc1be0efdd",
                            "653cee827d3bc7fc1be0efe1"
                        ],
                        "category": "652b9ce6b8fd6a63e2dcd856",
                        "tags": [
                            "POPULAR",
                            "FEATURED",
                            "TOP_RATED"
                        ]
                    }
                },
                {
                    "_id": "653bb7a2ecdcc0668e25a865",
                    "quantity": 3,
                    "product": {
                        "_id": "652a0f339698649ffbddfb28",
                        "name": "Product 10",
                        "slug": "product-10",
                        "description": "Product description",
                        "price": 350,
                        "stock": 99,
                        "soldItems": 41,
                        "brand": "SAMSUNG",
                        "mainImage": {
                            "_id": "652a0f339698649ffbddfb27"
                        },
                        "owner": "6527f52c13315530d3e381dc",
                        "subImages": [
                            {
                                "url": "https://res.cloudinary.com/dgtchtfd2/image/upload/v1698517139/ijal9rqfp50riy4fzbn6.jpg",
                                "asset_id": "fba68b4b061208834a32eefab01a8e75",
                                "public_id": "ijal9rqfp50riy4fzbn6",
                                "_id": "653d50969d96e589904fcd14"
                            },
                            {
                                "url": "https://res.cloudinary.com/dgtchtfd2/image/upload/v1698517141/dntageh2ybtto85ykwsp.jpg",
                                "asset_id": "fbd9410b8b266576996794be892fa88d",
                                "public_id": "dntageh2ybtto85ykwsp",
                                "_id": "653d50969d96e589904fcd15"
                            }
                        ],
                        "reviews": [
                            {
                                "user": "6527f0f9a5cb3daee993580c",
                                "rating": 5,
                                "comment": "I like it, it's very good quality product😀",
                                "_id": "6534df6d4d884e8c2194f1b7"
                            },
                            {
                                "user": "6527f52c13315530d3e381dc",
                                "rating": 4,
                                "comment": "it's very good product",
                                "_id": "6534dfd14d884e8c2194f1d7"
                            }
                        ],
                        "createdAt": "2023-10-14T03:46:59.430Z",
                        "updatedAt": "2023-10-28T18:19:02.594Z",
                        "__v": 3,
                        "rating": 4.5,
                        "colors": [
                            "653cedcf7d3bc7fc1be0efd5",
                            "653cee117d3bc7fc1be0efdd",
                            "653cee827d3bc7fc1be0efe1"
                        ],
                        "category": "652b9ce6b8fd6a63e2dcd856",
                        "tags": [
                            "POPULAR",
                            "FEATURED",
                            "TOP_RATED"
                        ]
                    }
                },
                {
                    "_id": "653bb7d6ecdcc0668e25a86f",
                    "quantity": 6,
                    "product": {
                        "_id": "652a0e59922150a5b926d36b",
                        "name": "Product 5",
                        "slug": "product-5",
                        "description": "Product description",
                        "price": 150,
                        "stock": 96,
                        "soldItems": 44,
                        "brand": "MI",
                        "mainImage": {
                            "_id": "652a0e59922150a5b926d36a"
                        },
                        "owner": "6527f52c13315530d3e381dc",
                        "subImages": [],
                        "reviews": [],
                        "createdAt": "2023-10-14T03:43:21.592Z",
                        "updatedAt": "2023-10-28T13:50:43.484Z",
                        "__v": 0,
                        "colors": [
                            "653cedcf7d3bc7fc1be0efd5",
                            "653cee117d3bc7fc1be0efdd",
                            "653cee827d3bc7fc1be0efe1"
                        ],
                        "category": "652b9ce6b8fd6a63e2dcd856",
                        "tags": [
                            "POPULAR",
                            "FEATURED",
                            "TOP_RATED"
                        ]
                    }
                }
            ],
            "status": "PENDING",
            "paymentProvider": "COD",
            "isPaymentDone": true,
            "createdAt": "2023-10-28T05:26:30.863Z",
            "updatedAt": "2023-10-28T06:56:14.925Z",
            "__v": 0,
            "paymentId": "ABC123DEF456",
            "address": {
                "_id": "653b8e7dc77b9ffbcbd6ede7",
                "addressLine1": "123 Main Street",
                "addressLine2": "Apt 4B",
                "city": "California",
                "country": "USA",
                "owner": "6527f0f9a5cb3daee993580c",
                "pincode": "411005",
                "state": "California",
                "createdAt": "2023-10-27T10:18:37.720Z",
                "updatedAt": "2023-10-27T10:18:37.720Z",
                "__v": 0
            }
        }
    },
    "message": "Order fetched successfully",
    "success": true
}

*/

/**
 * 
 * [
    {
        "_id": "653bb760ecdcc0668e25a854",
        "quantity": 2,
        "product": {
            "_id": "652a0ef29698649ffbddfb19",
            "name": "Product 7",
            "slug": "product-7",
            "description": "Product description",
            "price": 250,
            "stock": 100,
            "soldItems": 40,
            "brand": "MI",
            "mainImage": {
                "_id": "652a0ef29698649ffbddfb18"
            },
            "owner": "6527f52c13315530d3e381dc",
            "subImages": [],
            "reviews": [],
            "createdAt": "2023-10-14T03:45:54.367Z",
            "updatedAt": "2023-10-28T13:51:13.871Z",
            "__v": 0,
            "colors": [
                "653cedcf7d3bc7fc1be0efd5",
                "653cee117d3bc7fc1be0efdd",
                "653cee827d3bc7fc1be0efe1"
            ],
            "category": "652b9ce6b8fd6a63e2dcd856",
            "tags": [
                "POPULAR",
                "FEATURED",
                "TOP_RATED"
            ]
        }
    },
    {
        "_id": "653bb7a2ecdcc0668e25a865",
        "quantity": 3,
        "product": {
            "_id": "652a0f339698649ffbddfb28",
            "name": "Product 10",
            "slug": "product-10",
            "description": "Product description",
            "price": 350,
            "stock": 99,
            "soldItems": 41,
            "brand": "SAMSUNG",
            "mainImage": {
                "_id": "652a0f339698649ffbddfb27"
            },
            "owner": "6527f52c13315530d3e381dc",
            "subImages": [
                {
                    "url": "https://res.cloudinary.com/dgtchtfd2/image/upload/v1698517139/ijal9rqfp50riy4fzbn6.jpg",
                    "asset_id": "fba68b4b061208834a32eefab01a8e75",
                    "public_id": "ijal9rqfp50riy4fzbn6",
                    "_id": "653d50969d96e589904fcd14"
                },
                {
                    "url": "https://res.cloudinary.com/dgtchtfd2/image/upload/v1698517141/dntageh2ybtto85ykwsp.jpg",
                    "asset_id": "fbd9410b8b266576996794be892fa88d",
                    "public_id": "dntageh2ybtto85ykwsp",
                    "_id": "653d50969d96e589904fcd15"
                }
            ],
            "reviews": [
                {
                    "user": "6527f0f9a5cb3daee993580c",
                    "rating": 5,
                    "comment": "I like it, it's very good quality product😀",
                    "_id": "6534df6d4d884e8c2194f1b7"
                },
                {
                    "user": "6527f52c13315530d3e381dc",
                    "rating": 4,
                    "comment": "it's very good product",
                    "_id": "6534dfd14d884e8c2194f1d7"
                }
            ],
            "createdAt": "2023-10-14T03:46:59.430Z",
            "updatedAt": "2023-10-28T18:19:02.594Z",
            "__v": 3,
            "rating": 4.5,
            "colors": [
                "653cedcf7d3bc7fc1be0efd5",
                "653cee117d3bc7fc1be0efdd",
                "653cee827d3bc7fc1be0efe1"
            ],
            "category": "652b9ce6b8fd6a63e2dcd856",
            "tags": [
                "POPULAR",
                "FEATURED",
                "TOP_RATED"
            ]
        }
    },
    {
        "_id": "653bb7d6ecdcc0668e25a86f",
        "quantity": 6,
        "product": {
            "_id": "652a0e59922150a5b926d36b",
            "name": "Product 5",
            "slug": "product-5",
            "description": "Product description",
            "price": 150,
            "stock": 96,
            "soldItems": 44,
            "brand": "MI",
            "mainImage": {
                "_id": "652a0e59922150a5b926d36a"
            },
            "owner": "6527f52c13315530d3e381dc",
            "subImages": [],
            "reviews": [],
            "createdAt": "2023-10-14T03:43:21.592Z",
            "updatedAt": "2023-10-28T13:50:43.484Z",
            "__v": 0,
            "colors": [
                "653cedcf7d3bc7fc1be0efd5",
                "653cee117d3bc7fc1be0efdd",
                "653cee827d3bc7fc1be0efe1"
            ],
            "category": "652b9ce6b8fd6a63e2dcd856",
            "tags": [
                "POPULAR",
                "FEATURED",
                "TOP_RATED"
            ]
        }
    }
]
 */
