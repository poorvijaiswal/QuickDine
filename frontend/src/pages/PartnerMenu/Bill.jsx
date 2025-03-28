import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Bill = () => {
  const { preorderId } = useParams();
  const [billDetails, setBillDetails] = useState(null);

  useEffect(() => {
    console.log("Preorder ID:", preorderId); // Debugging log

    const fetchBillDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/preorders/${preorderId}`);
        console.log("Bill Details Response:", response.data); // Debugging log
        setBillDetails(response.data);
      } catch (error) {
        console.error("Error fetching bill details:", error);
      }
    };

    fetchBillDetails();
  }, [preorderId]);

  const handleMarkComplete = async () => {
    try {
      await axios.post("http://localhost:5000/api/payment/mark-complete", { preorderId });
      alert("Order marked as complete!");
    } catch (error) {
      console.error("Error marking order as complete:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!billDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="mt-11">Bill Details</h1>
      <div>
        <h2>Items:</h2>
        {billDetails.items.map((item) => (
          <div key={item.id}>
            <p>{item.name} - ₹{item.price} x {item.quantity}</p>
          </div>
        ))}
      </div>
      <h2>Total: ₹{billDetails.totalPrice}</h2>
      <button onClick={handleMarkComplete}>Mark Order as Complete</button>
    </div>
  );
};

export default Bill;