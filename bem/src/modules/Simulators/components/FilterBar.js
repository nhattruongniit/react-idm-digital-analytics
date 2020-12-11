import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

// components
import FilterBar from "components/common/FilterBar";

// hooks
import useDebounce from 'hooks/useDebounce';

const FilterBarComponent = props => {
  const [text, setText] = useState('');
  const { documentId } = props.match.params;

  const handleChangeText = (value) => {
    setText(value)
    props.setFilterKeyword(text, documentId);
  }

  return (
    <>
      <FilterBar {...props} handleChangeText={handleChangeText}/>
    </>
  )
}

export default withRouter(FilterBarComponent);