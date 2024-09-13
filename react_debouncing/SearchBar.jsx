import { useRef, useState } from 'react';
import useDebounceApi from './useDebounceApi.jsx';

const STATUS = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};

const SearchBar = () => {
  const searchText = useRef(null);
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState(STATUS.LOADING); //now we will be showing UI according to the status.
  const fetchData = async () => {
    //when we make a call to backend always use Try catch
    try {
      console.log('API CALL');
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${searchText?.current?.value}&limit=10`
      );
      const data = await res.json();
      console.log(data?.products);
      setResult(data?.products);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      console.log(error);
      setStatus(STATUS.ERROR);
    }

    //to show the results on UI - i will loop over the array of objects using map
    //I will create a Unordered_list

    //so each child in a list should have a unique key property

    //so map takes a function as an argument
    //and it loop over all the elements of the array
    //and transform them according to conditions mentioned
    //in the function
    //and map then returns a new array with updated elements
  };
  const debounceApiFn = useDebounceApi(fetchData, 1000);

  function handleSearch() {
    let searchQuery = searchText?.current?.value;
    console.log(searchQuery.trim().length);// TODO : add Abort Controller thing to abort the web-request using Fetch Method
    if (searchQuery.trim().length === 0) {
      return;
    }

    setStatus(STATUS.LOADING); //Before i make a call - set Status = Loading.
    // console.log(debounceApiFn);
    debounceApiFn();
    // fetchData();
  }

  return (
    <div>
      <input
        type="text"
        placeholder="GK-CS"
        ref={searchText}
        onChange={handleSearch}
      />
      {status === STATUS.LOADING && <h2>...loading</h2>}
      {status === STATUS.ERROR && <h2>Error Occured</h2>}
      {status === STATUS.SUCCESS && (
        <ul>
          {result.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchBar;
