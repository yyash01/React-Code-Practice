import { useRef } from "react";

/*
 file input lena hai without showing the input element to the user and just by
 clicking on the button.
*/

const FileInput = () => {
  // Scenario 3: File input
  const fileInputRef = useRef();

  const handleFileSelect = () => {
    fileInputRef.current.click();
    console.log(fileInputRef.current.value);
  };

  return (
    <>
      <input type="file" ref={fileInputRef} style={{ display: "none" }} />
      <button onClick={handleFileSelect}>Upload File</button>
    </>
  );
};

export default FileInput;
