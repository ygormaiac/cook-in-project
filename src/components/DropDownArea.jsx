import React, { useEffect, useState, useContext } from 'react';
import MyConText from '../context/Context';

export default function DropDownArea() {
  const [optionsArea, setOptions] = useState([]);
  const { setOptionArea } = useContext(MyConText);

  const fetchApiAreas = async () => {
    const results = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json())
      .then((res) => res.meals);
    setOptions([...results]);
  };

  useEffect(() => {
    fetchApiAreas();
  }, []);

  const forEachOptions = ({ strArea }) => (
    <option
      data-testid={ `${strArea}-option` }
      value={ strArea }
    >
      { strArea }
    </option>
  );

  const handleOptionsArea = ({ target }) => {
    setOptionArea(target.value);
  };

  return (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (event) => handleOptionsArea(event) }
      >
        <option data-testid="All-option" value="All">All</option>
        { optionsArea.map(forEachOptions) }
      </select>
    </div>
  );
}
