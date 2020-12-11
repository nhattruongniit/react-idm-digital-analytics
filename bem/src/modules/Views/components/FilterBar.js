import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// components
import FilterBar from "components/common/FilterBar";

// hooks
import useDebounce from 'hooks/useDebounce';

const FilterBarComponent = props => {
  const [text, setText] = useState('');
  const debounceVal = useDebounce(text);
  const { projectId } = props.match.params;

  useEffect(() => {
    props.setFilterKeyword(text, projectId);
  }, [debounceVal])

  const handleChangeText = (value) => {
    setText(value)
  }

  return (
    <>
      <FilterBar {...props} handleChangeText={handleChangeText}/>
    </>
  )
}

export default withRouter(FilterBarComponent);