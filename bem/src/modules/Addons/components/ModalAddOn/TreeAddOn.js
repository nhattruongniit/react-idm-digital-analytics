import React from 'react';
import styled from "styled-components"
import ChevronRight from '@carbon/icons-react/es/chevron--right/16';


const TreeAddOnStyled = styled.div`
  width: 200px;
  height: 100%;
  box-shadow: 0px 0px 20px 0px #D9EBFD;
  z-index: 1;
  overflow-y: scroll; 
`

const TreeContainerStyled = styled.div`
  position: relative;
  .spices {
    display: none;
    padding: 0 10px;
  }
  .arrow {
    margin-right: 4px;
    transition: all 0.3s ease;
    width: 20px;
    height: 20px;
    align-self: flex-start;
    margin-top: 3px;
  }
  input {
    width: 100%;
    height: 53px;
    position: absolute;
    top: 0;
    cursor: pointer;
    opacity: 0;
    z-index: 1;
    margin: 0;
    &:checked + .skies .spices {
      display: block;
    }
    &:checked + .skies .arrow svg {
      transform: rotate(90deg);
    }
  }
`

const ItemStyled = styled.div`
  position: relative;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 10px;
`;

const ItemNameStyled = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: #152935;
  flex-grow: 1;
  word-wrap: break-word;
  text-transform: capitalize;
`;

const ItemCountStyled = styled.div`
  border-radius: 6px;
  background-color: #d9ebfd;
  height: 13px;
  padding: 2px 7px;
  align-self: flex-start;
  margin-top: 8px;
  font-size: 8px;
  font-weight: 600;
  line-height: 1.25;
  text-align: center;
  color: #152935;
`

const ItemArrowStyled = styled.div`
  margin-right: 4px;
  transition: all 0.3s ease;
  width: 20px;
  height: 20px;
  align-self: flex-start;
  margin-top: 3px;
`;

const TreeAddOn = ({ categoryTree, getAddOnByCategory }) => {
  return (
    <TreeAddOnStyled>
      {categoryTree.length > 0 && categoryTree.map(category => {
        return (
          <TreeContainerStyled key={category.type}>
            <input type="checkbox" />
            <div className="skies">
              <ItemStyled>
                <div className="arrow">
                  <ChevronRight fill="var(--cds-text-02,#525252)"/>
                </div>
                <ItemNameStyled><span className="bx-text-default">{category.name}</span></ItemNameStyled>
                <ItemCountStyled>{category.count}</ItemCountStyled>
              </ItemStyled>
              <div className="spices">
                {category.items.map(subCate => {
                  return (
                    <ItemStyled key={subCate.id} onClick={() => getAddOnByCategory(subCate.type, subCate.name)}>
                      <ItemArrowStyled>
                        <ChevronRight fill="var(--cds-text-02,#525252)"/>
                      </ItemArrowStyled>
                      <ItemNameStyled><span className="bx-text-default">{subCate.name}</span></ItemNameStyled>
                      <ItemCountStyled>{subCate.count}</ItemCountStyled>
                    </ItemStyled>
                  )
                })}
              </div>
            </div>
          </TreeContainerStyled>
        )
      })}
    </TreeAddOnStyled>
  )
}

export default TreeAddOn;