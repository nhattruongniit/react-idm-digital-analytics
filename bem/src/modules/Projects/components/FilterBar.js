import React, { useState, useEffect } from 'react';

// components
import FilterBar from "components/common/FilterBar";

// hooks
import useDebounce from 'hooks/useDebounce';

const FilterBarComponent = props => {
  const [text, setText] = useState('');
  const debounceVal = useDebounce(text);

  useEffect(() => {
    props.setFilterKeyword(text);
  }, [debounceVal])

  const handleChangeText = (value) => {
    setText(value)
  }

  return <FilterBar {...props} handleChangeText={handleChangeText}/>
}

export default FilterBarComponent;