import { useEffect, useState, useRef, useCallback } from 'react';
import ProductDetails from './ProductDetails.jsx';
import './ReactTable.css';
const API = 'https://dummyjson.com/products';
const PRODUCTS_PER_PAGE = 10;

const ReactTable = () => {
  const [products, setProducts] = useState([]); //for UI
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const originalProducts = useRef([]); //do not touch it => backend Data Fetched once

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      const data = await res.json();
      if (data && data.products && Array.isArray(data.products)) {
        originalProducts.current = data.products;
        setProducts(data.products);
        setTotalPages(Math.ceil(data.products.length / PRODUCTS_PER_PAGE));
        //console.log(products[0]);
        // Object.keys(products[0]).forEach(key => console.log(key));
      }
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCurrPage = (selectedPage) => {
    if (selectedPage && selectedPage <= totalPages) {
      setCurrPage(selectedPage);
    }
  };

  const handleDelete = (dataId) => {
    //Approach should be making a DELETE API reqeust to the backend and delete from there
    //then fetch the data again.

    //but right now let say we are filtering on the frontend side only.
    const filterProducts = products.filter((prod) => dataId !== prod.id);
    updateProducts(filterProducts);
  };

  const handleSearchBtn = () => {
    if (searchTerm && searchTerm.length > 0) {
      const filteredProducts = originalProducts.current.filter((prod) =>
        prod?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      updateProducts(filteredProducts);
    }
  };

  const handleSearchInput = (e) => {
    const searchInput = e.target.value;
    setSearchTerm(searchInput);
    if (searchInput.length === 0) {
      updateProducts(originalProducts.current);
    }
  };

  const updateProducts = (data) => {
    setProducts(data);
    let updatedTotalPages = Math.ceil(data.length / PRODUCTS_PER_PAGE);
    setTotalPages(updatedTotalPages);
    setCurrPage((prev) => {
      if (prev === 0) return 1;
      return Math.min(prev, updatedTotalPages);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <h2>loading data ...</h2>;

  return (
    <>
      <h2> React Table</h2>
      <div className="table-container">
        <div className="table-container__searchbar">
          <input
            type="text"
            placeholder="Search by Title"
            className="searchbar"
            value={searchTerm}
            onChange={handleSearchInput}
          />
          <button style={{ cursor: 'pointer' }} onClick={handleSearchBtn}>
            Search
          </button>
        </div>
        {products.length > 0 ? (
          <>
            <table className="table-container__table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <ProductDetails
                  products={products}
                  page={currPage}
                  productsPerPage={PRODUCTS_PER_PAGE}
                  deleteHandler={handleDelete}
                />
              </tbody>
            </table>
            <div className="pagination">
              <div className="pagination__text" style={{ fontWeight: 600 }}>
                Page {currPage} of {totalPages}
              </div>
              <div className="pagination__action">
                <div
                  className={`btn ${currPage === 1 ? 'disabled' : ''}`}
                  onClick={() => handleCurrPage(currPage - 1)}
                >
                  ◀
                </div>
                <div
                  className={`btn ${currPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => handleCurrPage(currPage + 1)}
                >
                  ▶
                </div>
              </div>
            </div>
          </>
        ) : (
          <h2>No Products found</h2>
        )}
      </div>
    </>
  );
};

export default ReactTable;
