import React, { useState } from 'react';
import styled from 'styled-components';
import { Portal } from 'react-portal';
import { Modal, Checkbox, TextInput, Button, Tag } from 'carbon-components-react';

const TagStyled = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: flex-end;
  width: 65%;
  .bx--form-item {
    width: 100%;
  }
  .bx--text-input__field-wrapper {
    width: 90%;

  }
`

const ButtonStyled = styled.div`
  width: 100%;

  button + button {
    margin-left: 10px;
  }
`

const DesStyled = styled.div`
  margin-top: 10px;
`

const PrivateProjectModal = ({ isShowing, sizeModal, setPublicModal, setProjectPublic }) => {
  const [options, setOptions] = useState({
    charts: false,
    views: false,
    simulations: false,
    weather_files: false
  });
  const [name, setName] = useState('');
  const [tags, setTags] = useState([]);

  const resetState = () => {
    // reset state
    setTags([]);
    setName('');
    setOptions({
      charts: false,
      views: false,
      simulations: false,
      weather_files: false
    })

  }

  const handleSubmit = () => {
    const params = {
      ...options,
      tags
    }
    resetState();
    setProjectPublic(params);
  }

  const onChange = (checked, name) => {
    setOptions({
      ...options,
      [name]: checked
    })
  }

  const handleAddTags = () => {
    if(name === '') return;

    setTags([...tags, name]);
    setName('');
  }

  const handleRemoveTags = (id) => () => {
    const newTags =  tags.filter((_, idx) => idx !== id);
    setTags(newTags);
  }

  const closePublicModal = () => {
    resetState();
    setPublicModal(false, null)
  }

  return (
    <Portal>
      <Modal
        open={isShowing}
        primaryButtonText="Publish"
        secondaryButtonText="Canel"
        modalHeading="Are you sure?"
        onRequestClose={closePublicModal}
        onRequestSubmit={handleSubmit}
        size={sizeModal}
      >
        <div>
          Selected project will be made public.
          <br />
          <br />
          The modules that you want to public along:
          <Checkbox
            className="bx-charts"
            checked={options.charts}
            id="charts"
            indeterminate={false}
            labelText="Charts"
            onChange={onChange}
            wrapperClassName=""
          />
          <Checkbox
            className="bx-views"
            checked={options.views}
            id="views"
            indeterminate={false}
            labelText="Views"
            onChange={onChange}
            wrapperClassName=""
          />
          <Checkbox
            className="bx-simulations"
            checked={options.simulations}
            id="simulations"
            indeterminate={false}
            labelText="Simulations"
            onChange={onChange}
            wrapperClassName=""
          />
          <Checkbox
            className="bx-weather-file"
            checked={options.weather_files}
            id="weather_files"
            indeterminate={false}
            labelText="Weather_files"
            onChange={onChange}
            wrapperClassName=""
          />
        </div>
        <TagStyled>
          <TextInput
            id="tags"
            labelText="Tags:"
            placeholder="Placeholder enter tags"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <ButtonStyled>
            <Button size="small" onClick={handleAddTags}>Add</Button>
          </ButtonStyled>
        </TagStyled>
        <DesStyled>
          {tags.length > 0 && tags.map((tag, idx) => (
            <Tag key={idx} filter type="warm-gray" title="Clear Filter" onClick={handleRemoveTags(idx)}> {tag} </Tag>
          ))}
        </DesStyled>
      </Modal>
    </Portal>
  )
} 

export default PrivateProjectModal;
