onst url = `${base_url}products?${
    data?.brand && data.brand.length > 0 ? `brand=${data.brand}&&` : ""
  }${data?.tag && data.tag.length > 0 ? `tags=${data.tag}&&` : ""}${
    data?.category && data.category.length > 0
      ? `category=${data.category}&&`
      : ""
  }
  ${data?.color && data.color.length > 0 ?`colors=${data.color}&&` : ""}
  ${data?.minPrice ? `price=${data.minPrice}&&` : ""}
  `;
$ when i pass the category i am getting queryObj as 
queryObj = { '  colors': 'GREEN' }
but when i pass the color then the queryObj is
queryObj = { '  colors': 'GREEN' }
can you find out what is the problem in passing this if required modified the code for url
$
