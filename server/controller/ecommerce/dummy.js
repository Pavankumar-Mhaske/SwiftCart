{
    "_id": "65b3bb577580337d2fd7de0e",
    "name": "watch7",
    "slug": "watch7",
    "description": "this is the product just for entertainment....",
    "price": 2222,
    "stock": 19967,
    "soldItems": 33,
    "category": [
        {
            "_id": "652b9cf2b8fd6a63e2dcd85e",
            "name": "food",
            "owner": "6527f0f9a5cb3daee993580c",
            "createdAt": "2023-10-15T08:04:02.605Z",
            "updatedAt": "2023-10-15T08:04:02.605Z",
            "__v": 0
        }
    ],
    "brand": "SONY",
    "mainImages": [
        {
            "url": "https://res.cloudinary.com/dgtchtfd2/image/upload/v1706277700/qnmul1fpa3wspzwlfmav.jpg",
            "asset_id": "5906941ac3c5223d68eeae31bc210ab8",
            "public_id": "qnmul1fpa3wspzwlfmav",
            "_id": "65b3bb577580337d2fd7de0f"
        },
        {
            "url": "https://res.cloudinary.com/dgtchtfd2/image/upload/v1706277702/ff2depmib2okqfgj2zp0.jpg",
            "asset_id": "ecf40431897ee528cd46941cf7ebbde6",
            "public_id": "ff2depmib2okqfgj2zp0",
            "_id": "65b3bb577580337d2fd7de10"
        }
    ],
    "subImages": [
        {
            "url": "https://res.cloudinary.com/dgtchtfd2/image/upload/v1706277703/js1qnfk2yifrel552aw1.jpg",
            "asset_id": "8f2f1966436e9882d94412a99ccd92bc",
            "public_id": "js1qnfk2yifrel552aw1",
            "_id": "65b3bb577580337d2fd7de11"
        },
        {
            "url": "https://res.cloudinary.com/dgtchtfd2/image/upload/v1706277705/u6h4hvcbhpa6ij4gu5tj.jpg",
            "asset_id": "02c31c9618428b78767a3249a1d4b9cd",
            "public_id": "u6h4hvcbhpa6ij4gu5tj",
            "_id": "65b3bb577580337d2fd7de12"
        },
        {
            "url": "https://res.cloudinary.com/dgtchtfd2/image/upload/v1706277707/bvkovdw9wcnyryubg1ji.jpg",
            "asset_id": "c09a28f59ac0f07f1c3bd4897743faa4",
            "public_id": "bvkovdw9wcnyryubg1ji",
            "_id": "65b3bb577580337d2fd7de13"
        },
        {
            "url": "https://res.cloudinary.com/dgtchtfd2/image/upload/v1706277708/ybhtmkc38ts6j8gqq3se.jpg",
            "asset_id": "8dd86533c4129206a34e652a1b9528b4",
            "public_id": "ybhtmkc38ts6j8gqq3se",
            "_id": "65b3bb577580337d2fd7de14"
        }
    ],
    "colors": [
        {
            "_id": "653cedcf7d3bc7fc1be0efd5",
            "name": "GREEN",
            "owner": "6527f0f9a5cb3daee993580c",
            "createdAt": "2023-10-28T11:17:35.885Z",
            "updatedAt": "2024-01-05T11:36:13.685Z",
            "__v": 0
        },
        {
            "_id": "653cee827d3bc7fc1be0efe1",
            "name": "YELLOW",
            "owner": "6527f0f9a5cb3daee993580c",
            "createdAt": "2023-10-28T11:20:34.735Z",
            "updatedAt": "2024-01-05T11:36:03.916Z",
            "__v": 0
        },
        {
            "_id": "6590170e3b469629aadfa527",
            "name": "PINK",
            "owner": "6527f0f9a5cb3daee993580c",
            "createdAt": "2023-12-30T13:11:42.944Z",
            "updatedAt": "2024-01-05T11:35:47.720Z",
            "__v": 0
        }
    ],
    "tags": [
        "FEATURED",
        "POPULAR",
        "SPECIAL"
    ],
    "rating": 5,
    "owner": "6527f0f9a5cb3daee993580c",
    "createdAt": "2024-01-26T14:01:59.124Z",
    "updatedAt": "2024-02-26T01:15:26.229Z",
    "reviews": [
        {
            "user": "659d4f1dd51b0938945ec111",
            "rating": 5,
            "comment": "This was crazy.... i loved it soo much😀😀😀😀",
            "_id": "65dbdead26417091a48ba7be",
            "createdAt": "2024-02-26T00:58:58.236Z",
            "updatedAt": "2024-02-26T01:15:26.228Z"
        }
    ]
}



.colors {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .colors li {
    width: 20px;
    height: 20px;
    /* background-color: red; */
    border-radius: 50%;
  }

<div>
  <ul className="colors ps-0">
          {colors &&
            colors.map((color, index) => {
              return (
                  <li
                    key={index}
                    style={{
                      backgroundColor: color?.name,
                      cursor: "pointer",
                    }}
                  ></li>
                ></li>
                
              );  })}
        </ul>
</div>

"how can i make this all colors in exactly at the middle of the outer div..."