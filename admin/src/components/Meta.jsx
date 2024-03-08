import { Helmet } from "react-helmet";

import React from "react";

const Meta = (props) => {
  return (
    <>
      {/* Helmet is used to change the title of the page dynamically, we can pass whateven meta data we want to pass */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
    </>
  );
};

export default Meta;
