const ProductDetails = ({ products, page, productsPerPage, deleteHandler }) => {
  //page = 1 => products from [0 to productsPerPage] , slice(0,4) => [index=0 to index=3]
  //page = 2 => products from [productsPerPage to productsPerPage*2]
  //page = 3 => products from [productsPerPage*(page-1) to productsPerPage*(page)]

  return (
    <>
      {products
        .slice(productsPerPage * (page - 1), productsPerPage * page)
        .map((prod) => {
          const { id, title, category, price, rating } = prod;
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{title}</td>
              <td>{category}</td>
              <td>{price}</td>
              <td>{rating}</td>
              <td>
                <button onClick={() => deleteHandler(id)}>Delete</button>
              </td>
            </tr>
          );
        })}
    </>
  );
};
export default ProductDetails;
