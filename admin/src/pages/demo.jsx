* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-ffffff: #ffffff;
  --color-131921: #131921;
  --color-3b4149: #3b4149;
  --color-febd69: #febd69;
  --color-232f3e: #232f3e;
  --color-bf4800: #bf4800;
  --color-232f3e: #232f3e;
  --color-f5f5f7: #f5f5f7;
  --color-ededed: #ededed;
  --color-777777: #777777;
  --color-1c1c1b: #1c1c1b;
  --color-f2f2f2: #f2f2f2;
  --color-1900f6: #00f600;
  --color-00ba00: #00ba00;
}

body {
  font-family: "Rubik", sans-serif;
}

.section-heading {
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
  margin-bottom: 30px;
  letter-spacing: 0.3px;
  /* text-transform: uppercase; */
  color: var(--color-131921);
}

.card-wrapper {
  background-color: var(--color-ffffff);
  box-shadow: 0px 0px 10px #0000001a;
  padding: 15px;
}

a {
  text-decoration: none;
  display: inline-block;
}

.form-control:focus {
  box-shadow: none;
  border-color: inherit;
}

.gap-5 {
  gap: 5px;
}

.gap-10 {
  gap: 10px;
}

.gap-15 {
  gap: 15px;
}
.gap-20 {
  gap: 20px;
}

.gap-30 {
  gap: 30px;
}

.button {
  background-color: var(--color-232f3e);
  color: var(--color-ffffff);
  font-size: 14px;
  padding: 13px 33px;
  border-radius: 25px;
}

.button-inActive {
  background-color: var(--color-777777);
  color: var(--color-ffffff);
  font-size: 14px;
  padding: 13px 33px;
  border-radius: 25px;
  cursor: not-allowed;
}

.button:hover {
  background-color: var(--color-febd69);
  color: var(--color-131921);
}

/* Header Part */
.header-top-strip {
  border-bottom: 1px solid var(--color-3b4149);
  background-color: var(--color-131921);
}

.header-upper {
  background-color: var(--color-131921);
}

.header-bottom {
  background-color: var(--color-232f3e);
}

.header-upper .input-group-text {
  background-color: var(--color-febd69);
}

.header-upper .header-upper-links img {
  width: 31px;
  height: 31px;
}

.header-upper .header-upper-links p .user-details {
  color: var(--color-1900f6);
  letter-spacing: 0.3;
  text-transform: capitalize;
}

/* // style={{ color: "green", fontSize: "24px" }} */
.pawword-matched .green-text {
  color: var(--color-00ba00);
  font-size: 16px;
  font-weight: 500;
}

.pawword-matched .green-text span {
  color: var(--color-00ba00);
  font-size: 24px;
}

.transition-effect {
  transition: opacity 1s ease; /* Change opacity over 0.5 seconds */
}

/* here a refers to the Link, NavLinks, etc */
.header-bottom .menu-links a,
.header-bottom .dropdown button {
  color: var(--color-ffffff);
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  letter-spacing: 0.3;
  text-transform: uppercase;
}

.header-bottom .dropdown button:focus {
  box-shadow: none;
}

.header-bottom .dropdown-menu {
  background-color: var(--color-131921);
  width: 100%;
  transform: translate3d(0px, 57px, 0px) !important;
}

/* remove hover effect */
.header-bottom .dropdown-item {
  padding: 20px;
  /* margin-bottom:3px; */
  border: 1px solid var(--color-3b4149);
}
.header-bottom .dropdown-item:hover {
  background-color: transparent;
  color: var(--color-febd69) !important;
}

.invert-white {
  @apply invert brightness-0 transition;
  cursor: pointer;
}
/* Header Part End Here */

/* Footer Part  */
footer {
  background-color: var(--color-232f3e);
}

footer:not(:first-child) {
  border-top: 1px solid rgba(225, 225, 225, 0.1);
}

footer .input-group-text {
  background-color: var(--color-232f3e);
  color: var(--color-ffffff);
  padding: 8px 17px;
}
/* Footer Part Ends Here */

/* Home Page */

/* 🌹🌹 Home Wrapper 1 🌹🌹*/
/* *** 💪🏻 main-banner */
.main-banner-content {
  top: 15%;
  left: 5%;
}

.main-banner-content h4 {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: var(--color-bf4800);
  margin: 0 0 12px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}
.main-banner-content h5 {
  font-size: 42px;
  line-height: 54px;
  margin: 0 0 12px;
  font-weight: 500;
  letter-spacing: -2px;
  text-transform: none;
}

.main-banner-content p {
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.4;
  color: var(--color-131921);
}

/* *** 🤏 small-banner */

.small-banner-content {
  top: 25%;
  left: 10%;
}

.small-banner-content h4 {
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: var(--color-bf4800);
  margin: 0 0 12px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.small-banner-content h5 {
  font-size: 22px;
  line-height: 34px;
  letter-spacing: -2px;
  font-weight: 500;
  text-transform: none;
}

.small-banner-content p {
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.4;
  color: var(--color-131921);
}

.small-banner {
  width: 49%;
}
/*🌺🌺 Home Wrapper 1 ends 🌺🌺 */

/* 🌹🌹 Home Wrapper 2 🌹🌹*/
.home-wrapper-2 {
  background-color: var(--color-f5f5f7);
}
/*🌺🌺 Home Wrapper 2 ends 🌺🌺 */

/* 🌹🌹 Categories Section 🌹🌹*/
.categories {
  background-color: var(--color-ffffff);
  box-shadow: 0px 0px 10px #0000001a;
  padding: 15px;
}

.categories > div {
  width: 25%;
  padding: 10px 10px 10px 20px;
}

.categories > div > div {
  width: 60%;
}

.categories > div:nth-child(1),
.categories > div:nth-child(2),
.categories > div:nth-child(3),
.categories > div:nth-child(4) {
  border-bottom: 1px solid var(--color-ededed);
}

.categories > div:nth-child(1),
.categories > div:nth-child(2),
.categories > div:nth-child(3) {
  border-right: 1px solid var(--color-ededed);
}

.categories > div:nth-child(5),
.categories > div:nth-child(6),
.categories > div:nth-child(7) {
  border-right: 1px solid var(--color-ededed);
}
/*🌺🌺  Categories Section ends here 🌺🌺 */
/* Home Page Ends Here */

/* 🌹🌹 Blog Part 🌹🌹 */
.blog-card {
  background-color: var(--color-ffffff);
  /* padding: 15px; */
  border-radius: 10px;
  box-shadow: 0px 0px 10px #0000001a;
}

.blog-card img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.blog-content {
  padding: 15px;
}

.blog-content p.date {
  font-size: 13px;
  line-height: 24px;
  text-transform: uppercase;
  letter-spacing: 0;
  font-weight: 400;
  color: var(--color-777777);
  padding: 0;
}

.blog-content h5 {
  font-size: 18px;
  color: var(--color-131921);
  line-height: 28px;
  letter-spacing: 0.4;
  margin: 0 0 12px;
  font-weight: 500;
}

.blog-content p.description {
  font-size: 13px;
  line-height: 22px;
  letter-spacing: 0.4;
  color: var(--color-777777);
  margin: 0;
}

.single-blog-card {
  background-color: var(--color-ffffff);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #0000001a;
}

.single-blog-card h3 {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-1c1c1b);
  /* line-height: 28px; */
  letter-spacing: 0.4;
  margin: 0 0 12px;
}

.single-blog-card p {
  font-size: 14px;
  /* line-height: 22px; */
  letter-spacing: 0.4;
  color: var(--color-777777);
  margin: 0;
}

.single-blog-card a {
  font-size: 18px;
  font-weight: 400;
  color: var(--color-777777);
  text-transform: capitalize;
  margin-bottom: 20px;
}

/* 🌺🌺  Blog Part Ends here 🌺🌺 */

/* 🌹🌹 Product Part 🌹🌹 */
.product-card {
  padding: 15px;
  background-color: var(--color-ffffff);
  box-shadow: 0px 0px 10px #0000001a;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
}

.product-card .product-image {
  /* height: 180px;
  width: 280px; */
}

.product-card .product-image-container {
  height: 300px; /* Set a fixed height for the container */
  display: flex;
  overflow: hidden; /* Hide any overflowing content */
}
.product-card .product-image-container img {
  flex: 1; /* Make each image take up equal space */
  height: 100%;
  width: auto;
  object-fit: cover; /* Cover the container while maintaining aspect ratio */
}

.product-card .product-image img {
  object-fit: contain;
}

.product-card .product-image > img:last-child {
  display: none;
}

.product-card:hover .product-image > img:nth-child(1) {
  display: none;
}

.product-card:hover .product-image > img:last-child {
  display: block;
}

.product-card:hover .action-bar {
  right: 10px;
}
.product-card .product-details h6 {
  color: var(--color-bf4800);
  font-size: 13px;
}

.product-card .product-details h5 {
  font-size: 15px;
  color: var(--color-1c1c1b);
}

.product-card .product-details p.description {
  font-size: 13px;
  color: var(--color-777777);
  margin-right: 20px;
}
.product-card .product-details p {
  font-size: 16px;
  color: var(--color-1c1c1b);
}

.product-card .action-bar {
  top: 10%;
  right: -20px;
  transition: 0.3s;
}

.wishlist-icon {
  top: 2%;
  right: 12px;
}
/* 🌺🌺  Product Part Ends here 🌺🌺 */

/* 🌹🌹 Special Product 🌹🌹 */
.special-product-card {
  padding: 20px 10px;
  border-radius: 10px;
  background-color: var(--color-ffffff);
}

.special-product-card .product-image img {
  object-fit: cover;
}

.special-product-card .product-image > img:last-child {
  display: none;
}

.special-product-card:hover .product-image > img:nth-child(1) {
  display: none;
}

.special-product-card:hover .product-image > img:last-child {
  display: block;
}

.special-product-card .product-image-container {
  height: 270px; /* Set a fixed height for the container */
  display: flex;
  overflow: hidden; /* Hide any overflowing content */
}
.special-product-card .product-image-container img {
  flex: 1; /* Make each image take up equal space */
  height: 100%;
  width: auto;
  object-fit: cover; /* Cover the container while maintaining aspect ratio */
}

/* 🌺🌺 Special Product Ends here 🌺🌺 */

/* 🌹🌹 Famous Card 🌹🌹 */
.famous-card .famous-content {
  top: 10%;
  left: 10%;
}
.black-background {
  background-color: #000000 !important;
  color: var(--color-ffffff) !important;
}

.famous-card img {
  border-radius: 10px;
}

.famous-content {
  flex: 1;
  padding: 10px;
}

.famous-content h5 {
  font-size: 13px;
  line-height: 20px;
  font-weight: 400px;
  color: var(--color-ffffff);
  margin-bottom: 7px;
  text-transform: uppercase;
}
.famous-content h6 {
  font-size: 24px;
  line-height: 38px;
  font-weight: 500;
  color: var(--color-ffffff);
}
.famous-content p {
  font-size: 16px;
  line-height: 24px;
  font-weight: 100;
  color: var(--color-ffffff);
}

/* arranging the image at the bottom and content at the top of the famous card component */
.famous-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: 430px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
  box-shadow: 0px 0px 15px #0000001a;
}

.famous-card .famous-content {
  position: absolute;
  top: 0;
  left: 0;
  color: #000000;
  /* border: 1px solid black; */
}

.famous-card img {
  align-items: center;
  justify-content: center;
  padding: 10px;
  /* border: 1px solid black; */
}

/* 🌺🌺 Famous Card Ends here 🌺🌺 */

/* 🌹🌹 Our Store 🌹🌹 */
.filter-card {
  background-color: var(--color-ffffff);
  border-radius: 10px;
  padding: 15px 15px 25px;
}

.filter-title {
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: var(--color-1c1c1b);
  margin-bottom: 20px;
}

.filter-card ul,
.filter-card .form-check-label {
  list-style-type: none;
  font-size: 13px;
  line-height: 30px;
  color: var(--color-777777);
  cursor: pointer;
}

.filter-card .form-check-input:focus {
  box-shadow: none;
  border-color: rgba(0, 0, 0, 0.25);
}
.filter-card .form-check-input:checked {
  background-color: var(--color-febd69);
  border-color: var(--color-febd69);
}

.sub-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-1c1c1b);
  margin-bottom: 15px;
  margin-top: 20px;
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

.random-products h5 {
  font-size: 14px;
  margin-bottom: 8px;
}
.random-products:first-child {
  border-bottom: 1px solid var(--color-ededed);
}

.filter-sort-grid {
  padding: 10px;
  background-color: var(--color-ffffff);
  border-radius: 10px;
}

.grid img {
  width: 35px;
  height: 35px;
  background-color: var(--color-f2f2f2);
  padding: 8px;
  border-radius: 3px;
  cursor: pointer;
}

.gr-12 {
  width: 100%;
}

.gr-6 {
  width: 49%;
}

.gr-4 {
  width: 32%;
}

.gr-3 {
  width: 24%;
}

.gr-2 {
  width: 16%;
}
/* 🌺🌺  THIS TWO THINGS JUST I NEED TO REMOVE TO MAKE THE FULL VIEW OF THE PRODUCT IMAGE  🌺🌺 */
.gr-12 .product-card {
  display: flex; /* 🌺🌺 */
  gap: 20px;
}

.gr-6 .product-image {
  width: 100%;
}

.gr-6 .product-image img {
  margin: auto;
  display: block;
}

.gr-12 .product-card .product-image {
  width: 30%; /* 🌺🌺 */
  /* width: 270px; */
}

/* .gr-12 .product-card .product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
} */

.gr-12 .product-card .product-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}

.gr-12 .action-bar {
  top: 20%;
  /* right: -20px; */
  /* transition: 0.3s; */
}

/* When the product-card is expreemly small then reduce down the fonts also */
.gr-2 .product-card .product-details h6 {
  color: var(--color-bf4800);
  font-size: 12px;
}

.gr-2 .product-card .product-details h5 {
  font-size: 13px;
  color: var(--color-1c1c1b);
}

.gr-2 .product-card .product-details p {
  font-size: 15px;
  color: var(--color-1c1c1b);
}
/* 🌺🌺 Our Store Ends here 🌺🌺 */

/* 🌹🌹 Contact Page 🌹🌹 */
.contact-inner-wrapper {
  padding: 30px 20px;
  border-radius: 15px;
  background-color: #ffffff;
  gap: 15px;
}

.contact-inner-wrapper > div {
  width: 48%;
}

.contact-title {
  font-size: 26px;
  font-weight: 500;
  line-height: 35px;
  text-align: left;
}

.contact-inner-wrapper form .form-control {
  border-radius: 25px;
  border: 1px solid var(--color-ededed);
  padding: 15px 20px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  letter-spacing: 0.3;
  /* text-transform: uppercase; */
  color: var(--color-777777);
  background-color: var(--color-f5f5f7);
}

.contact-inner-wrapper ul {
  list-style-type: none;
  padding: 0;
}

.contact-inner-wrapper address,
.contact-inner-wrapper a,
.contact-inner-wrapper p {
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  letter-spacing: 0.3;
  text-transform: capitalize;
  color: var(--color-777777);
}

.contact-inner-wrapper a.email {
  text-transform: lowercase;
}

/* 🌺🌺 Contact Page Ends here 🌺🌺 */

/* 🌹🌹 Compare Product and Wishlist 🌹🌹 */
.compare-product-card {
  padding: 20px 15px;
  background-color: var(--color-ffffff);
  box-shadow: 0px 0px 10px #0000001a;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
}

.compare-product-card .cross,
.wishlist-card .cross {
  top: 15px;
  right: 15px;
  width: 25px;
  padding: 3px;
  cursor: pointer;
}

.compare-product-details h5.title,
.wishlist-card h5.title {
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
  color: var(--color-1c1c1b);
  letter-spacing: 0.4;
  margin: 0 0 12px;
}

.compare-product-details h6.price,
.wishlist-card h6.price {
  font-size: 15px;
  line-height: 22px;
  font-weight: 400;
  color: var(--color-bf4800);
  margin: 0 0 12px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.compare-product-card .product-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.wishlist-card .product-image-container {
  height: 260px; /* Set a fixed height for the container */
  display: flex;
  overflow: hidden; /* Hide any overflowing content */
}
.wishlist-card .product-image-container img {
  flex: 1; /* Make each image take up equal space */
  height: 100%;
  width: auto;
  object-fit: cover; /* Cover the container while maintaining aspect ratio */
}

/* 🌺🌺 Compare Product and some Wishlist Ends here 🌺🌺 */

/* 🌹🌹 Wishlist 🌹🌹 */
.wishlist-card {
  padding: 20px 15px;
  background-color: var(--color-ffffff);
  box-shadow: 0px 0px 10px #0000001a;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
}

/* 🌺🌺 Wishlist Ends here 🌺🌺 */

/* 🌹🌹 Auth Card 🌹🌹 */
.auth-card {
  padding: 20px;
  background-color: var(--color-ffffff);
  width: 500px;
  margin: 30px auto;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #0000001a;
  overflow: hidden;
}

.auth-card h3 {
  font-size: 19px;
  font-weight: 500;
  color: var(--color-777777);
  text-transform: capitalize;
}

.auth-card p {
  font-size: 13px;
  font-weight: 400;
  color: var(--color-777777);
  margin-bottom: 20px;
}

.auth-card .form-control {
  height: 50px;
  background-color: var(--color-f5f5f7);
  color: var(--color-131921);
  font-size: 14px;
  border-radius: 25px;
  border: 1px solid var(--color-ededed);
  padding: 15px 20px;
  line-height: 18px;
  font-weight: 400;
  letter-spacing: 0.3;
  /* text-transform: capitalize; */
}

.auth-card a {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-1c1c1b);
  text-transform: capitalize;
}
.auth-card a:hover {
  text-decoration: underline;
}

.signup {
  background-color: var(--color-febd69);
  color: var(--color-131921);
  /* border: none; */
  border: 1px solid var(--color-777777);
}
.signup:hover {
  background-color: var(--color-131921);
  color: var(--color-ffffff);
  text-decoration: none;
}

.auth-card .cancel {
  background-color: var(--color-ffffff);
  color: var(--color-131921);
  /* text-decoration: none; */
  border: 1px solid var(--color-ffffff);
}
.auth-card .cancel:hover {
  border: 1px solid var(--color-ededed);
  text-decoration: none;
  box-shadow: 0px 0px 1px #0000001a;
}

/* 🌺🌺 Auth Card Ends here 🌺🌺 */

/* 🌹🌹 Policy Pages 🌹🌹 */
.policy {
  background-color: var(--color-ffffff);
  padding: 30px;
}
/* 🌺🌺 Policy Pages Ends here 🌺🌺 */

/* 🌹🌹 Main Product Page 🌹🌹 */

/* Description */

.description-inner-wrapper {
  padding: 30px;
  background-color: var(--color-ffffff);
  border-radius: 10px;
  box-shadow: 0px 0px 10px #0000001a;
}

.description-wrapper h4,
.reviews-wrapper h3 {
  font-size: 18px;
  color: var(--color-1c1c1b);
  font-weight: 500;
  line-height: 24px;
  margin: 0 0 12px;
  margin-bottom: 10px;
  letter-spacing: 0.3px;
  text-transform: capitalize;
}

.description-wrapper p {
  font-size: 14px;
  color: var(--color-777777);
  line-height: 22px;
  letter-spacing: 0.4;
  margin: 0;
}

/* Review */
.review-inner-wrapper {
  padding: 30px;
  background-color: var(--color-ffffff);
  border-radius: 10px;
  box-shadow: 0px 0px 10px #0000001a;
}

.review-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 1px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.review-head h4 {
  font-size: 18px;
  color: var(--color-1c1c1b);
  font-weight: 500;
  line-height: 24px;
  margin: 0 0 12px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.review-head p,
.review-head a {
  font-size: 14px;
  color: var(--color-777777);
  line-height: 22px;
  letter-spacing: 0.4;
  margin: 0;
}

.review-form h4 {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  padding: 20px 0px;
  color: var(--color-777777);
}

.review-form {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.review .review-head {
  border: 0px solid rgba(0, 0, 0, 0.1);
  padding-top: 30px;
}

.review .review-head,
.review .review-body {
  padding-bottom: 10px;
}
.review:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.review p {
  font-size: 14px;
  color: var(--color-777777);
  line-height: 22px;
  letter-spacing: 0.4;
  margin: 0;
}

/*  product */
.main-product-image {
  padding: 20px;
  background-color: var(--color-ffffff);
  border-radius: 10px;
  /* box-shadow: 0px 0px 10px #0000001a; */
}

.main-product-image > div {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* border : 1px solid var(--color-ededed); */
  border: 1px solid rgba(0, 0, 0, 0.25);
}

.other-product-images {
  padding: 20px;
  background-color: var(--color-ffffff);
  /* box-shadow: 0px 0px 10px #0000001a; */
}

/* properties of the enlargedImageContainer
 enlargedImageContainerClassName : "enlargedImageContainer"  */
.main-product-image .enlargedImageContainer {
  width: 123% !important;
  margin-top: -40px !important;
  height: 110% !important;
  border: 1px solid var(--color-777777) !important;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5) !important;
  border-radius: 10px !important;
  margin-left: 40px !important;
  z-index: 9999999;
  background-color: var(--color-ffffff) !important;
}
.other-product-images > div {
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 48%;
}

/* 🌄🌄 skeleton  🌄🚞 */
.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}

.skeleton-text {
  width: 100%;
  height: 0.7rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
}

.skeleton-text__body {
  width: 75%;
}

.skeleton-footer {
  width: 30%;
}
/* 🌄🌄 skeleton  Ends here 🌄🚞 */

.main-product-details {
  padding: 20px;
  border-radius: 10px;
  background-color: var(--color-ffffff);
}

.border-bottom {
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.25); */
  border-bottom: 1px solid rgba(0, 0, 0, 0.25) !important;
}

.main-product-details h3.title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-1c1c1b);
  margin-bottom: 10px;
}

.main-product-details p.price {
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.main-product-details a.review-btn,
.main-product-details p.t-review {
  color: var(--color-777777);
  font-size: 13px;
}

.product-heading {
  font-size: 14px;
  color: var(--color-1c1c1b);
  margin-bottom: 0px;
}

.product-data {
  font-size: 13px;
  color: var(--color-777777);
  margin-bottom: 0px;
}

.cart-buy button {
  text-transform: uppercase;
}

.cart-buy .signup {
  text-transform: capitalize;
}

.main-product-details a {
  font-size: 14px;
  color: var(--color-777777);
}
.accordion-body {
  font-size: 14px;
  color: var(--color-777777);
  margin: 0px 33px 0px 0px;
}
.copyIcon {
  width: 25px;
  height: 25px;
  object-fit: contain;
  cursor: pointer;
}

.product-link {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px; /* Adjust the max-width to your design needs */
}
/* 🌺🌺 Main Product Page Ends here 🌺🌺 */

/* 🌹🌹 Cart Page 🌹🌹 */
.cart-header {
  /* border-bottom: 1px solid #eaeaea; */
}

.cart-header h4 {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-777777);
}

.cart-col-1 {
  width: 40%;
}

.cart-col-2 {
  width: 10%;
}

.cart-col-3 {
  width: 15%;
}

.cart-col-4 {
  width: 15%;
}

.delete-img {
  cursor: pointer;
}

.cart-wrapper .title {
  font-size: 15px;
  color: var(--color-777777);
  margin-bottom: 0px;
}

.cart-wrapper .product-heading {
  color: var(--color-777777);
}

.cart-wrapper p.price {
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  margin-bottom: 0px;
  color: var(--color-1c1c1b);
}

.cart-wrapper .cart-border-bottom {
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.25); */
  border-bottom: 1px solid #eaeaea !important;
}

.product-heading {
  font-size: 14px;
  color: var(--color-1c1c1b);
  margin-bottom: 0px;
}

.product-data {
  font-size: 13px;
  color: var(--color-777777);
  margin-bottom: 0px;
}

.cart-wrapper .button {
  font-size: 15px;
  font-weight: 450;
  letter-spacing: 1px;
}



/* 🌺🌺 Cart Page Ends here 🌺🌺 */

/* 🌹🌹 Checkout Page 🌹🌹 */
.breadcrumb-item {
  font-size: 15px;
  color: var(--color-777777);
  margin-bottom: 0px;
}

.breadcrumb-item .cart-link {
  color: var(--color-777777);
  /* font-size: 20px; */
}

.checkout-wrapper .cart-title {
  font-size: 15px;
  color: var(--color-131921);
  margin-bottom: 10px;
  line-height: 1.7;
}

.checkout-wrapper .cart-sub-title {
  font-size: 13px;
  color: var(--color-777777);
  margin-bottom: 0px;
}

.checkout-wrapper .total {
  font-size: 14px;
  color: var(--color-1c1c1b);
}
.final-pricing {
  display: flex;
  justify-content: space-between;
  align-items: end;
  justify-content: flex-end;
}

.checkout-wrapper .total-price {
  font-size: 24px;
  color: var(--color-131921);
}

.checkout-wrapper .total-price span {
  font-size: 14px;
  color: var(--color-bf4800);
}

.checkout-wrapper .subtotal,
.checkout-wrapper .shipping {
  font-size: 16px;
  color: var(--color-777777);
}

.checkout-wrapper .shipping-total,
.checkout-wrapper .shipping-price,
.checkout-wrapper .final-products-price {
  font-size: 16px;
  color: var(--color-131921);
}

.checkout-wrapper .address-title {
  font-size: 20px;
  color: var(--color-1c1c1b);
  /* margin-bottom: 10px; */
  line-height: 1.7;
}

.checkout-wrapper .title {
  font-size: 15px;
  color: var(--color-1c1c1b);
  /* margin-bottom: 0px; */
}

.checkout-wrapper .user-details {
  font-size: 15px;
  color: var(--color-1c1c1b);
  /* margin-bottom: 0px; */
}

.order-info {
  background-color: #f2f2f2;
  /* border on left only */
  border-left: 1px solid #cbcbcb;
  padding-left: 40px;
}
.form-control {
  /* border-radius: 10px; */
  border-radius: 20px;
  border: 1px solid var(--color-ededed);
  padding: 15px 20px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  letter-spacing: 0.3px;
}

/* 🌺🌺 Checkout Page Ends here 🌺🌺 */



