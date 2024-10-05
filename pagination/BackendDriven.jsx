import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); //current page
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const prodCount = 10; //we want 10 products on each page

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${(page - 1) * prodCount}`
      ); //Web API - provided by the browser
      const data = await res.json();
      console.log(data);
      if (data && data.products) {
        setProducts(data.products); //update products list => Now 10 products will be in it
        if (totalPages == 0) {
          setTotalPages(Math.ceil(data?.total / prodCount));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //Now we will fetch the Data when the current page changes
  useEffect(() => {
    fetchData();
  }, [page]);

  const selectedPageHandler = (selectedPage) => {
    //if selected page is present in range and
    //if selected Page is not equal to current Page then only update the current Page.
    if (
      selectedPage > 0 &&
      selectedPage <= totalPages &&
      selectedPage != page
    ) {
      setPage(selectedPage); //updating the current Page to Selected Page.
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => selectedPageHandler(i)}
          className={page === i ? 'selected__page btn' : 'btn'} //conditional Styling
          title={`Go to page ${i}`}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <h1>Product Catalog</h1>
      {loading ? (
        <h2>Loading</h2>
      ) : products.length > 0 ? (
        <div className="products">
          {products.map((prod) => (
            <div key={prod?.id} className="product">
              <img
                className="product__img"
                src={prod?.thumbnail}
                alt={prod?.title}
              />
              <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {prod?.title}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>No Products Found</h2>
      )}
      {products.length > 0 ? (
        <div className="pagination">
          <div
            className={page > 1 ? 'btn prev__btn' : 'btn disable'}
            onClick={() => selectedPageHandler(page - 1)}
          >
            ◀
          </div>
          <div className="page__numbers">{renderPageNumbers()}</div>
          <div
            className={page < totalPages ? 'btn next__btn' : 'btn disable'}
            onClick={() => selectedPageHandler(page + 1)}
          >
            ▶
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
