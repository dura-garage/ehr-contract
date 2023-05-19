import React from "react";


const Card = ({ name, description, ethAddress, image, key }) => (
  <div className="max-w-sm">
    <Card key={key}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <h6 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {ethAddress}
      </h6>

      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </Card>
  </div>
);
export default Card;