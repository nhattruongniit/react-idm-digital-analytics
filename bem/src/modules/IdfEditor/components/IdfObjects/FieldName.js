import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import SkeletonText from 'carbon-components-react/lib/components/SkeletonText';

const Container = styled.div`
  margin-right: 10px;
  position: relative;
  z-index: 100;
  display: table;
  border: 1px solid var(--cds-ui-03,#e0e0e0);
  border-top: none;
`;

const Column = styled.div`
  display: table-cell;
  padding-right: 20px;
  border-top: 1px solid var(--cds-ui-03,#e0e0e0);
  border-bottom: 1px solid var(--cds-ui-03,#e0e0e0);
  vertical-align: middle;
  font-weight: bold;
  white-space: nowrap;
`;

const Row = styled.div`
  width: max-content;
  min-width: 100%;
  display: table-row;
  text-align: left;
  color: #152935;
  box-sizing: border-box;
  background-color: var(--cds-ui-01,#f4f4f4);
  color: var(--cds-text-02,#525252);
  height: ${props => props.theme.height}px; // control-size
  font-size: ${props => props.theme.fontSize}px; // control-size

  &:first-child {
    ${Column} {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: var(--cds-ui-01,#f4f4f4);
      color: var(--cds-text-02,#525252);
      height: 58px;
    }
  }

  .bx--skeleton__text {
    position: absolute;
    height: 100%;
  }

  // &:nth-child(even) {
  //   background-color: #dfe3e6;
  // }

  // &:nth-child(odd) {
  //   background-color: #ffffff;
  // }
`;

const IndexColumn = styled(Column)`
  text-align: right;
  padding-left: 20px;
`;

const NameColumn = styled(Column)`
  min-width: 150px;
  max-width: 250px;
`;

const UnitColumn = styled(Column)`
  max-width: 100px;
`;

const OverflowText = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IsRequiredIcon = styled.span`
  color: #e0182d;
`;

const FieldName = ({ fields, extensibleLength, ex, useZebraStyles, type }) => {
  const allFields = [];
  const extensibleFields = [];
  _.forEach(fields, (field, fieldIndex) => {
    const isExtensible = !!field.options['extensible'];
    if (isExtensible) {
      extensibleFields.push(field);
    } else {
      allFields.push(field);
    }
  });

  _.range(extensibleLength).forEach(extensibleIndex => {
    extensibleFields.forEach(field => {
      const field_name = field.field_name.replace('Vertex 1', 'Vertex ' + (extensibleIndex + 1).toString());
      allFields.push({
        ...field,
        field_name,
      });
    });
  });

  const [isSkeleton, setIsSkeleton] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsSkeleton(false), process.env.REACT_APP_TIME_LOADING_SKELETON || 700)
  }, [])


  return (
    <Container className={`${useZebraStyles ? 'idfEditor-zebra-head' : '' } idfEditor-table-${type}`} >
      <Row>
        <IndexColumn>&nbsp;</IndexColumn>
        <NameColumn>Field Name</NameColumn>
        <Column>Units</Column>
        <Column>IDD</Column>
      </Row>
      {_.map(allFields, (field, index) => {
        const isRequired = field.options['required-field'] === '1';
        return (
          <Row className="head" key={`${field.field_id}-extensible-${index}`}>
            {isSkeleton && <SkeletonText />}
            <IndexColumn>
              {isRequired && <IsRequiredIcon>!</IsRequiredIcon>}
              {index + 1}
            </IndexColumn>
            <NameColumn>
              <OverflowText title={field.field_name}>
                {field.field_name}
              </OverflowText>
            </NameColumn>
            <UnitColumn>
              <OverflowText title={field.options.units}>
                {field.options.units}
              </OverflowText>
            </UnitColumn>
            <Column>{field.idd_name}</Column>
          </Row>
        );
      })}
    </Container>
  );
};

export default FieldName;
