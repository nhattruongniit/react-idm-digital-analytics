import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 250px;
  font-size: 1em;
  line-height: 1.29;
  text-align: left;
  color: #152935;
  overflow: hidden;
  text-overflow: ellipsis;

  a {
    color: #152935;
  }
`;

const NameEditInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  font-size: 1em;
`;

class EditableName extends React.Component {
  state = {
    isEditingName: false,
  }

  componentDidMount() {
    this.nameEditInputRef = React.createRef();
  }

  setIsEditingName = (isEditingName) => this.setState({ isEditingName });

  editName = () => {
    this.setIsEditingName(true);
    setTimeout(() => {
      this.nameEditInputRef.current.focus();
      this.nameEditInputRef.current.setSelectionRange(0, this.nameEditInputRef.current.value.length)
    }, 50);
  }

  saveChanges = (value) => {
    const { onNameChange, name } = this.props;
    if (value.length > 0 && value !== name) {
      onNameChange(value);
    }
    this.setIsEditingName(false);
  }

  render() {
    const { name, href } = this.props;
    const { isEditingName } = this.state;
    return (
      <Container>
        {!isEditingName &&
          <>
            {href &&
              <Link to={href}>{name}</Link>
            }
            {!href && <span className="bx-text-default">{name}</span>}
          </>
        }
        <NameEditInput
          style={{ display: isEditingName ? 'block' : 'none' }}
          ref={this.nameEditInputRef}
          defaultValue={name}
          onBlur={e => this.saveChanges(e.target.value)}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              this.saveChanges(e.target.value);
            }
          }}
        />
      </Container>
    );
  }
}

export default EditableName;
