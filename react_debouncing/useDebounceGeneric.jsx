import { useState, useCallback } from 'react';

const useDebounceGeneric = (value, delay) => {
  const [debounceVal, setDebounceVal] = useState(value || '');

  //so here debounce will return a new function that will apply delay before calling setDebounceVal function
  //we want debounce to be called only one time when component renders 1st time - we can use useCallback here.

  //useCallback always require a function to memoize it
  //here debounce function is returning a function that is adding delay
  //toh useCallback usko memoize krdega and it will redefine it only when [delay] changes.
  const dbounceFxn = useCallback(debounce(setDebounceVal, delay), [delay]);
  dbounceFxn(value); // now i will pass in the value as an argument.
  return debounceVal;
};

function debounce(callback, delay) {
  let timerId; //place the timerId in the parent function
  return function (...args) {
    //i will invoke the callback function but after a delay
    //so to schedule a function after a delay - i will need setTimeout

    //to cancel the timer we require - clearTimeout
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);

    //now there can be multiple timer already running
    //i have to cancel that timer and then set a new timer
  };
}

export default useDebounceGeneric;
