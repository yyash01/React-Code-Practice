let counter = 0;

const getData = () => {
  //making a API call. and getting the data from the server.
  console.log("Hello yash bhai", counter++);
};

//delay - is basically the delay b/w two keypresses that we are taking about.
//suppose we have made a new function call before 300 seconds
//so my previous timer is still running
//first i will cancel the previous timeout and then start the new timeout

function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const betterFunction = debounce(getData, 300);
