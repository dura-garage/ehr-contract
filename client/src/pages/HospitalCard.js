import React from "react";

const Card = ({ name, description,ethAddress,key }) => (
  <div className="card" key={key}>
    <div className="card-header">
      <h3 className="card-title">{name}</h3>
    </div>
    <div className="card-body">
      <p className="card-text">{description}</p>
      <p className="card-text">ETH Address: {ethAddress}</p>
    </div>
  </div>
);

export default Card;