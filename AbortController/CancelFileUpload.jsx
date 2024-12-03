const cancelFileUpload = () => {

    const controller = new AbortController();
    const signal = controller.signal;
    const file = 'some File String';

    fetch(URL, {
        method: "POST",
        body : file,
        signal,
    })
    .then((res)=> console.log(res))
    .catch(err => {
        if(err.name==="AbortController"){
            console.log("upload canceled");
        }
    });

    cancelButton.addEventListner('click',()=> controller.abort());
};