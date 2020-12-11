import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

// components
import FilterBar from "components/common/FilterBar";

// hooks
// import useDebounce from 'hooks/useDebounce';

const FilterBarComponent = props => {
  const [text, setText] = useState('');
  // const debounceVal = useDebounce(text);
  const { projectId } = props.match.params;

  // Collaboration projects need to wait some time
  // for server events, before fetching documents
  // So moving action in value handler
  // useEffect(() => {
  // }, [debounceVal])

  const handleChangeText = (value) => {
    props.setFilterKeyword(text, projectId);
    setText(value)
  }

  return (
    <>
      <FilterBar {...props} handleChangeText={handleChangeText}/>
    </>
  )
}

export default withRouter(FilterBarComponent);