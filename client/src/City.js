import React from 'react'

function City({ aCity }) {
  const { tempreture, name, description } = aCity;

  return (
    <div>
      <p>
        {name} temperature is {tempreture} and the weather is {description}
      </p>
      <hr />
    </div>
  )
}

export default City