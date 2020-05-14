import React from "react";
import { Header } from "semantic-ui-react";
import ArchiveProduct from './ArchiveProduct'

function ProductAttributes({ description, user, _id, sku }) {

  return (
    <>
      <Header as="h3"> About this product</Header>
      <p>{description}</p>
      <ArchiveProduct user={user} _id={_id} sku={sku} />
    </>
  );
}

export default ProductAttributes;
