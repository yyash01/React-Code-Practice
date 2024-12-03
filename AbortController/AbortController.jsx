import React, { useState, useEffect } from "react";

function Modal({ isOpen, onClose }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!isOpen) return; // Do nothing if the modal is not open

    const controller = new AbortController();//created the controller using AbortController constructor
    const signal = controller.signal;//then we grap the associated signal of the controller.

    // Fetch data when modal opens
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/modal-data", { signal });
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Modal fetch aborted");
        } else {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchData();

    // Cleanup: Cancel fetch if modal is closed
    return () => {
      controller.abort();
    };
  }, [isOpen]); // Dependency array watches the modal's open state

  if (!isOpen) return null; // Do not render the modal if not open

  return (
    <div className="modal">
      <h2>Modal Content</h2>
      {data ? <p>Data: {JSON.stringify(data)}</p> : <p>Loading...</p>}
      <button onClick={onClose}>Close Modal</button>
    </div>
  );
}

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default App;
