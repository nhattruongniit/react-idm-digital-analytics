import React from 'react';
import styled from 'styled-components';
import IdfObjectItem from '../../containers/ImportObject/IdfObjectItem';
import FieldName from '../IdfObjects/FieldName';
import stickyPositionEffect from '../../helpers/stickyPositionEffect';

const Container = styled.div`
  position: relative;
  display: flex;
  overflow: scroll;
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex: 1;
  margin-bottom: -20px;
`;

const FieldNameContainer = styled.div.attrs({
  style: props => ({
    left: props.stickyPosition ? `${props.stickyPosition}px` : 0,
    position: props.stickyPosition ? 'absolute' : 'relative',
  }),
})`
`;

const IdfObjects = ({
  objects,
  fields,
  orderOffset,
  useZebraStyles,
}) => {
  const containerRef = React.createRef();
  const stickyPosition = stickyPositionEffect(containerRef);

  return (
    <Container ref={containerRef}>
      {fields && (
        <FieldNameContainer stickyPosition={stickyPosition}>
          <FieldName fields={fields} useZebraStyles={useZebraStyles} />
        </FieldNameContainer>
      )}
      { objects.map((object, index) => (
        <IdfObjectItem
          {...object}
          key={`idf-object-item-${object.id}`}
          orderNumber={orderOffset + index + 1}
          fieldInfoArray={fields}
        />
      ))}
    </Container>
  )
}

export default IdfObjects;
