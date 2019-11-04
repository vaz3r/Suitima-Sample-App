import React from 'react';

const RProducts = (props) => {
    const ProductOnClick = (Product) => {
        props.setSelectedProduct(Product);
        props.setModalVisibility({isVisible: true, isInsert: false});
    }

    const _Products = [];

    props.Products.forEach((Product, index) => {
      let Availability;

      console.log(Product);

      if (Product.ProductAvailable === 0) {
        Availability = (
          <div className="NotAvailable">
            <p>NOT AVAILABLE</p>
          </div>
        );
      } else {
        Availability = "";
      }

      _Products.push(
        <article className="Product" key={index} onClick={ () => ProductOnClick(Product) }>
          {Availability}
          
          <figure>
            <img alt={Product.ProductName} src={Product.ProductImage}></img>
          </figure>
          <div className="ProductInfo">
            <p>{Product.ProductName} ({Product.ProductQty})</p>
            <div className="PriceTag">
              <p>${Product.ProductPrice}</p>
            </div>
          </div>
        </article>
      );
    });

    return _Products;
}

export default RProducts;