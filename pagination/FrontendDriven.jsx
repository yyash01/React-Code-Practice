import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);//current page
  const prodCount = 10; //we want 10 products on each page

  const fetchData = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=100'); //Fetch is => Web API - provided by the browser
    const data = await res.json();//response is a readable stream - we have to convert it into json format
    console.log(data);
    if (data && data.products) {
      setProducts(data.products);
    }
  };
  //I will fetch the data when my component is rendered for the First time
  //if we put the dependency array emepty - then the callback function of useEffect hook
  //will be executed only one time - at the intial render
  useEffect(() => {
    fetchData();
  }, []);

  const selectedPageHandler = (selectedPage) => {
    //if selected page is present in range and
    //if selected Page is not equal to current Page then only update the current Page.
    if (
      selectedPage > 0 &&
      selectedPage <= products?.length / prodCount &&
      selectedPage != page
    ) {
      setPage(selectedPage); //updating the current Page to Selected Page.
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = products?.length / prodCount;
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => selectedPageHandler(i)}
          className={page === i ? 'selected__page btn' : 'btn'} //conditional Styling
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <h1>hwllo from yash</h1>
      {products.length && (
        <div className="products">
          {/* Map will basically map over each element of the array products */}
          {products
            .slice((page - 1) * prodCount, page * prodCount)
            .map((prod) => (
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
      )}
      {products.length && (
        <div className="pagination">
          <div
            className={page > 1 ? 'btn prev__btn' : 'btn disable'}
            onClick={() => selectedPageHandler(page - 1)}
          >
            ◀
          </div>
          <div className="page__numbers">{renderPageNumbers()}</div>
          <div
            className={
              page < products?.length / prodCount
                ? 'btn next__btn'
                : 'btn disable'
            }
            onClick={() => selectedPageHandler(page + 1)}
          >
            ▶
          </div>
        </div>
      )}
    </>
  );
}

export default App;
