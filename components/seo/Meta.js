import React from "react";
import Head from "next/head";

const Meta = ({ title, keywords, description, image }) => {
  return (
    <Head>
      <title>{title} | App</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf-token" content="{{ csrf_token() }}" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <meta name="description" content={description} />
      {/* <meta itemprop="name" content={title} />
    <meta itemprop="description" content={description} /> */}
      <meta name="keywords" content={keywords} />
      <meta name="image" content={image} />
    </Head>
  );
};
Meta.defaultProps = {
  title: "Arshi-365-ecommerce",
  keywords: "ecommerce,product,sewrvices",
  description:
    "cwsgeg gergerg gedgerg degersger egvvesrgeg gwergewgerwghergherh",
  image: "test purpose",
};

export default Meta;
