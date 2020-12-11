import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import _ from 'lodash';

// carbons
import SkeletonPlaceholder from 'carbon-components-react/lib/components/SkeletonPlaceholder';

import TextDefault from 'components/common/TextDefault';

const HeaderContainer = styled.div`
  position: relative;
  height: 20px;
  margin-bottom: 32px;

  &:after {
    content: '';
    background: #8897a2;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 1px;
    width: 100%;
  }
`;

const Circle = styled.div`
  border: 1px solid #8897a2;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  z-index: 1;
  background: #f4f7fb;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ItemWrapper = styled.div`
  width: ${({ itemWidth }) => itemWidth}px;
  margin-right: ${({ itemMargin }) => itemMargin}px;
  box-sizing: border-box;
  margin-bottom: 50px;
  position: relative;
  &:last-child {
    margin-right: 0;
  }
`;

const formatDate = dateString => moment(dateString).format('DD MMM YYYY');

const DateGroup = ({
  dateString,
  items,
  tileSize,
  isItemSelected,
  gridItemComponent,
  ...props
}) => {
  const gridEl = useRef(null);
  const size = 1 / tileSize * 100;
  const rows = _.chunk(items, tileSize);
  const GridItem = gridItemComponent;
  const [itemWidth, setItemWidth] = useState(null);
  const [itemMargin, setItemMargin] = useState(null);
  const [isSkeleton, setIsSkeleton] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsSkeleton(false), process.env.REACT_APP_TIME_LOADING_SKELETON || 700)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (!gridEl.current) return;
      const bound = gridEl.current.getBoundingClientRect();
      const width = bound.width / tileSize - (1 - tileSize / 100) * 50;
      const margin = (bound.width - width * tileSize) / (tileSize - 1);
      setItemWidth(width);
      setItemMargin(margin);
    }, 0);
  }, [items, tileSize]);

  return (
    <div>
      <HeaderContainer>
        <Circle />
        <div className="text-date">
          <TextDefault text={formatDate(dateString)} />
        </div>
      </HeaderContainer>
      <Grid ref={gridEl}>
        {rows.map((row, index) => (
          <React.Fragment key={index}>
            <Row>
              {row.map((item) => (
                <ItemWrapper key={item.id} itemWidth={itemWidth} itemMargin={itemMargin}>
                  {isSkeleton && <SkeletonPlaceholder />}
                  <GridItem
                    item={item}
                    isSelected={isItemSelected(item.id)}
                    size={size}
                    {...props}
                  />
                </ItemWrapper>
              ))}
            </Row>
          </React.Fragment>
        ))}
      </Grid>
    </div>
  );
}

export default DateGroup;
