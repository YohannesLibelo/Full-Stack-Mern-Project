// This component is used to view the available stock. All users can access this feature.

import React from "react";
import "./ViewStock.css";

export default function ViewStock(props) {
  // Retrieve the authentication token from session storage
  let authToken = sessionStorage.getItem("token");

  // Function to handle item removal from the stock
  const changeItem = (e) => {
    const id = e.target.dataset.id;
    fetch(`http://localhost:8080/stock/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`, // Update the header format
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Removed stock item with ID: ${data.car_id}`);
      });
  };

  console.log(props.currentStock);

  return (
    <div className="viewStock-main-container">
      <h2 className="heading viewStock-heading">See available stock below</h2>
      <div className="viewStock-container">
        <table>
          <tbody>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Item Quantity</th>
            </tr>
            {/* Map through the current stock items and display them in the table */}
            {props.currentStock?.map((item) => (
              <tr key={item._id}>
                <td>{item.productID}</td>
                <td>{item.productName}</td>
                <td>{item.productQuantity}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
