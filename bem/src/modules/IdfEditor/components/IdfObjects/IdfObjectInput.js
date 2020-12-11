/*eslint no-mixed-operators: "off"*/

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextInput, NumberInput, Dropdown } from 'carbon-components-react';
import { validateObjectValue, getMinimumValue } from '../../helpers/idfObjectValidation';

const Container = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  align-items: flex-end;

  .bx--dropdown__wrapper.bx--list-box__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .bx--dropdown,
  input,
  .bx--number input[type="number"] {
    background-color: transparent;
    width: 100%;
    justify-content: center;
  }

  .bx--number {
    width: 100%;
    height: 100%;
    justify-content: center;
  }

  label {
    display: none;
  }

  .bx--form-item {
    height: 100%;
    flex-grow: 1;
    input {
      height: 100%;
      font-size: inherit;
    }
  }
  .bx--list-box__label, .bx--dropdown {
    font-size: inherit
  }
  .bx--form-requirement {
    font-size: 0.55em;
  }
  .bx--dropdown {
    height: 100%
  }
  .bx--list-box__field {
    height: inherit;
    display: flex;
  }

  .bx--number__control-btn {
    width: 1.25em;
    height: 1em;
  }
  .bx--number__controls {
    bottom: 0.625em !important;
  }

  .bx--list-box__menu-item {
    height: auto !important;
  }
`;

const IdfObjectInput = ({
  field,
  value,
  onChange,
  references,
  onValidateObject,
}) => {
  const ref = React.createRef();
  const [isInvalid, setIsInvalid] = useState(false);
  const [invalidText, setInvalidText] = useState('Invalid value');

  useEffect(() => {
    validation(value);
    const input = ref.current.querySelector('input');
    const onMouseWheel = event => event.preventDefault();

    if (input) {
      input.addEventListener('mousewheel', onMouseWheel);
      return () => {
        input.removeEventListener('mousewheel', onMouseWheel);
      }
    }
  }, [])
  
  let inputType = '';
  if (!field.options.type || field.options.choices === null && field.options.type === 'alpha') {
    inputType = 'text'
  } else if (!field.options.type || field.options.choices === null && field.options.type === 'node') {
    inputType = 'node'
  } else {
    inputType = 'number'
  }
  
  // const inputType = !field.options.type || field.options.choices === null && field.options.type === 'alpha' ? 'text' : 'number';
  const name = field.field_name;
  const isDropdown = Array.isArray(field.options.choices || field.options['object-list'])  || field.options.hasOwnProperty("external-list");

  let dropdownValues = [];

  if (field.options.choices !== null) {
    dropdownValues = field.options.choices;
  }

  if (field.options.type === 'object-list' && field.options['object-list'].length > 0) {
    field.options['object-list'].forEach(name => {
      dropdownValues = dropdownValues.concat(references[name]);
    });
  }

  if(field.options.type === 'external-list'){
    dropdownValues = references[field.options['external-list']] || []
  }

  function validation(value) {
    const validationResult = validateObjectValue(field, value);
    const isValid = validationResult.valid;
    setIsInvalid(!isValid);
    onValidateObject(field.field_id, isValid);
    if (!isValid) {
      setInvalidText(validationResult.reason);
    }
    return validationResult;
  }

  function handleOnChangeNumber(event) {
    if(!value && !event.imaginaryTarget.data && event.type === 'click') {
      const minValue = getMinimumValue(field);
      onChange(minValue);
      setIsInvalid(false);
    }else {
      const eventValue = event.imaginaryTarget.value;
      validation(parseFloat(eventValue));
      onChange(parseFloat(eventValue));
    }
  }
  function handleOnChangeText(event) {
    const eventValue = event.target.value;
    validation(eventValue);
    onChange(eventValue);
  }

  function handleOnBlur(event) {
    const eventValue = event.target.value;
    const validationResult = validation(eventValue);
    if (validationResult.valid) {
      onChange(eventValue);
    }
  }

  const renderInput = () => {
    if (isDropdown) {
      if(dropdownValues.length > 0) {
        dropdownValues = dropdownValues.includes(undefined) ? [] : dropdownValues
      }
      return (
        <Dropdown
          id={name}
          label=""
          items={dropdownValues}
          selectedItem={value}
          onChange={result => onChange(result.selectedItem)}
          labelText={''}
          disabled={dropdownValues.length === 0}
        />
      );
    }

    if (!isDropdown && inputType === 'text' || inputType === 'node') {
      return (
        <TextInput
          id={name}
          name={name}
          type="text"
          defaultValue={value}
          labelText={''}
          onBlur={handleOnBlur}
          onChange={handleOnChangeText}
          invalid={isInvalid}
          invalidText={invalidText}
        />
      );
    }

    if (!isDropdown && inputType === 'number') {
      return (
        <NumberInput
          id={name}
          name={name}
          invalid={isInvalid}
          invalidText={invalidText}
          value={Number.isNaN(parseFloat(value)) ? '' : parseFloat(value)}
          onBlur={handleOnBlur}
          onChange={handleOnChangeNumber}
        />
      );
    }
  }

  return (
    <Container ref={ref}>
      {renderInput()}
    </Container>
  );

}

export default IdfObjectInput;
