import React from "react";

const Card = (props) => (
  <div className="card" key={props.key}>
    <div className="card-header">
      <h3 className="card-title">{props.name}</h3>
    </div>
    <div className="card-body">
      <p className="card-text">{props.description}</p>
      <p className="card-text">ETH Address:{props.ethAddress}</p>
      <img src={`https://ipfs.io/ipfs/${props.image}`} alt="Hospital" style={{ width: '200px', height: '200px' }} />
    </div>
  </div>
);
export default Card;