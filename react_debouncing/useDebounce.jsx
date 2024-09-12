import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debounceVal, setDebounceVal] = useState(value || '');
  //useEffect hook  basically takes two things => callback,dependency array
  //if i've taken the dependency array empty then this callback will run only one time on the intial render of the component.
  // console.log('useDebounce called');
  useEffect(() => {
    //inside the callback i will have the setTimout
    //schedules the execution of the callback function after a delay in milliseconds.
    let timerId = setTimeout(() => {
      setDebounceVal(value);
    }, delay);

    //return cleanup function
    return () => clearTimeout(timerId);
  }, [value]);

  return debounceVal;
};

export default useDebounce;
