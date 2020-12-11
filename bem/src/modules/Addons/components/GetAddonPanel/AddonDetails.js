import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 30px 20px 20px 20px;
  font-size: 0.9rem;
`;

const AddonDescription = styled.div`
  min-height: 100px;
`;

const AddonTagList = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const AddonTag = styled.div`
  color: #3d70b2;
  border: 1px solid #3d70b2;
  text-align: center;
  padding: 3px 10px;
  &:not(:last-child) {
    margin-right: 5px;
  }
`;

const MoreInfoSection = styled.div`
  padding: 20px 0;
`;

const MoreInfoTitle = styled.div`
  color: var(--cds-text-01,#161616);
  font-weight: bold;
  margin-bottom: 8px;
`;

const MoreInfoContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MoreInfoColumn = styled.div`
  width: 33%;
`;

const MoreInfoText = styled.div`
  margin-bottom: 8px;
  color: var(--cds-text-01,#161616);
`;

const Link = styled.a`
  color: #5596E6;
`;

const ReportLink = styled(Link)`
  margin-top: 20px;
`;

const Separator = styled.div`
  background-color: #DFE3E6;
  width: 100%;
  height: 1px;
`;

const AddonDetails = ({ addon }) => (
  <Container>
    <AddonDescription>{addon.description}</AddonDescription>
    {addon.tags && addon.tags.length > 0 && (
      <AddonTagList>
        {addon.tags.map(tag => (
          <AddonTag key={tag}>{tag}</AddonTag>
        ))}
      </AddonTagList>
    )}

    <MoreInfoSection>
      <MoreInfoTitle>What's New</MoreInfoTitle>
      <MoreInfoContent>
        New shading add-on feature to allow quick assessment of shading devices
      </MoreInfoContent>
    </MoreInfoSection>

    <Separator />

    <MoreInfoSection>
      <MoreInfoTitle>Information</MoreInfoTitle>
      <MoreInfoContent>
        <MoreInfoColumn>
          <MoreInfoText>Author</MoreInfoText>
          <MoreInfoText>David Tran</MoreInfoText>
        </MoreInfoColumn>
        <MoreInfoColumn>
          <MoreInfoText>Languages</MoreInfoText>
          <MoreInfoText>English</MoreInfoText>
        </MoreInfoColumn>
        <MoreInfoColumn>
          <MoreInfoText>Contact</MoreInfoText>
          <MoreInfoText>
            <Link>Website</Link>
          </MoreInfoText>
          <MoreInfoText>
            <Link>Get support</Link>
          </MoreInfoText>
        </MoreInfoColumn>
      </MoreInfoContent>
    </MoreInfoSection>

    <ReportLink>Report abuse</ReportLink>
  </Container>
);

export default AddonDetails;