import React, { useEffect } from 'react';
import styled from 'styled-components';
import IdfObjectItem from '../../containers/IdfObjects/IdfObjectItem';
import FieldName from './FieldName';
import stickyPositionEffect from '../../helpers/stickyPositionEffect';

const Container = styled.div`
  position: relative;
  display: flex;
  overflow: scroll;
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex: 1;
`;

// const FieldNameContainer = styled.div.attrs({
//   style: props => {
//     console.log(props)
//     return ({
//       left: props.stickyPosition ? `${props.stickyPosition}px` : 0,
//       position: props.stickyPosition ? 'absolute' : 'relative',
//     })
//   }
// })`
// `;

const FieldNameContainer = styled.div`
  position: sticky;
  left: 0;
  z-index: 15;
`

const BoxIdfStyled = styled.div`
  display: flex;
  width: 100%;
`

const IdfObjects = ({
  objects,
  fields,
  orderOffset,
  isAddNewObject,
  // classItem,
  type,
  useZebraStyles
}) => {
  const containerRef = React.createRef();
  const stickyPosition = stickyPositionEffect(containerRef);

  useEffect(() => {
    if(containerRef) {
        containerRef.current.scrollLeft = isAddNewObject
    }
  }, [isAddNewObject]);

  if(!fields) return <Container ref={containerRef}></Container>;
  const extensibleObject = objects.find(obj => obj.extensions && Object.keys(obj.extensions).length > 0);
  const extensibleName = extensibleObject ? Object.keys(extensibleObject.extensions)[0] : '';
  const extensibleLength = extensibleObject ? extensibleObject.extensions[extensibleName].length : 0;

  return (
    <Container ref={containerRef}>
      {fields && (
        <FieldNameContainer stickyPosition={stickyPosition} container={containerRef}>
          <FieldName fields={fields} extensibleLength={extensibleLength} useZebraStyles={useZebraStyles} type={type} />
        </FieldNameContainer>
      )}
      <BoxIdfStyled className={`${useZebraStyles ? 'idfEditor-zebra' : '' } idfEditor-table-${type}` }>
        {objects.map((object, index) => (
          <IdfObjectItem
            {...object}
            key={`idf-object-item-${object.id}`}
            orderNumber={orderOffset + index + 1}
            fieldInfoArray={fields}
            extensibleName={extensibleName}
          />
        ))}
      </BoxIdfStyled>
    </Container>
  )
}

export default IdfObjects;
