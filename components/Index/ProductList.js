import { Card } from "semantic-ui-react"

function ProductList({products}) {
  function mapProductsToItems(products) {
    return products.map(product => ({
      header: product.name,
      image: product.mediaUrl,
      meta:`$${product.price}`,
      color: "teal",
      fluid:true, //to take up all the available space
      childKey: product._id, //like key in react
      href: `/product?_id=${product._id}`,  //template literate`` and query string?
    }))
  }
  return <Card.Group stackable itemsPerRow="3" centered items={mapProductsToItems(products)} />
}

export default ProductList;
