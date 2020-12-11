import React, { Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { ToastNotification, Button } from "carbon-components-react";
import SettingsIcon from "@carbon/icons-react/lib/settings/20";

import PopoverButton from './common/PopoverButton';

const ContainerStyled = styled.div`
  width: 300px;
`

const PanelStyled = styled.div`
  overflow: auto;
  max-height: calc(100vh - 170px);

  .bx--toast-notification {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 0;
    background-color: #f4f4f4;
    color: #161616;
    & + & {
      margin-top: .5rem;
    }
  }
  .bx--toast-notification:first-child {
    margin-top: 0
  }
  .bx--toast-notification, .bx--toast-notification__details {
    width: 100%;
    margin-right: 0;
  }
  .bx--toast-notification {
    padding-left: 5px;
  }
  .bx--toast-notification__subtitle, .bx--toast-notification__caption {
    color: #161616;
  }
  .bx--toast-notification__close-button .bx--toast-notification__close-icon {
    fill: #161616;
  }
  .bx--toast-notification__close-button {
    width: 27px;
    min-width: 27px;
  }
  .bx--toast-notification__icon {
    margin-right: 7px;
  }
`

// const TitleStyled = styled.div`
//   font-weight: bold;
//   color: ${props => props.textColor || '#161616'};
// `

const ViewStyled = styled.div`
  color: #161616;
  font-weight: bold;
  cursor: pointer;
`

const TopStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin: 10px;
`

const DismissStyled = styled.div`
  text-decoration: underline;
  cursor: pointer;
  color: #5596e6;
`

const TimeStyled = styled.div`
  font-size: 12px;
`

const ActionStyled = styled.div`
  text-align: right;
  margin-top: 15px;
  
  button {
    display: inline-block;
    padding: 0 10px;
    & + button {
      margin-left: 10px;
    }
  }
`

const ContentStyled = styled.div`
`

const ButtonStyled = styled.button`
  font-size: 0.875rem;
  font-family: "ibm-plex-sans", Helvetica Neue, Arial, sans-serif;
  font-weight: 400;
  width: 100%;
  height: 100%;
  border: none;
  display: inline-block;
  background-color: transparent;
  text-align: left;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #152935;
  max-width: 11.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background-color: rgba(85, 150, 230, 0.1);
  }
`

const SettingStyled = styled.div`
  input {
    left: 0px !important;
    top: -7px !important;
  }
`

const AvatarStyled = styled.div`
  margin-right: 10px;
  width: 30px;
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    width: 100%;
    height: 30px;
    position: relative;
  }
  img:before {
    content: " ";
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    padding-bottom: 100%;
    background: #f4f4f4 url(/assets/images/icon-avatar.svg) no-repeat center center;
  }
`

const InfoStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const UserStyled = styled.div`
  word-break: break-all;
  p:last-child {
    font-size: 13px;
    line-height: 16px;
  }
`

const NoteStyled = styled.div`
  padding: 10px;
`

// function renderNotify(data, group) {
//   return (
//     <>
//       {data[`${group}`].map((item, idx) => {
//         return (
//           <ToastNotification
//             key={idx}
//             kind={item.type}
//             caption={
//               <div>
//                 <TimeStyled>Time stamp [{moment(item.createdAt).format('HH:mm:ss A')}]</TimeStyled>
//                 {item.user_options && (
//                   <ActionStyled>
//                     <Button kind='danger' size='small'>Deny</Button>
//                     <Button kind='primary' size='small'>Accept</Button>
//                   </ActionStyled>
//                 )}
//               </div>
//             }
//             iconDescription="describes the close button"
//             subtitle={item.message}
//             timeout={0}
//             title={item.title}
//             onCloseButtonClick={() => console.log('close success notifcation')}
//           />
//         )
//       })}
//     </>
//   )
// }

const Notification = ({ notifies, canAcceptCanDenyNotification, seenNotification, fetchNotificationSuccesss }) => {

  const handleCanAcceptCanDeny = (id, url) => {
    canAcceptCanDenyNotification(id, url);
  }

  const handleSeen = (url) => {
    seenNotification(url)
  }

  const handleSeenAll = () => {
    if(notifies.length > 0) {
      fetchNotificationSuccesss([]);
      for(const item of notifies) {
        const url = item.mark_seen;
        seenNotification(url)
      }
    }
  }

  return (
    <ContainerStyled>
      <ContentStyled>
        {Array.isArray(notifies) && notifies.length > 0 ? (
          <>
            <TopStyled>
            {/* <TitleStyled>Today</TitleStyled> */}
            <DismissStyled onClick={handleSeenAll}>Dismiss all</DismissStyled>
            </TopStyled>
            <PanelStyled>
              {notifies.length > 0 && notifies.map(ele => (
                <Fragment key={ele.id}>
                  <ToastNotification
                    kind={ele.type}
                    caption={
                      <>
                        <InfoStyled>
                          <AvatarStyled>
                            <img src={ele.user_data.avatar_url} alt=" " />
                          </AvatarStyled>
                          <UserStyled>
                            <p>{ele.user_data.name}</p>
                            <p>{ele.user_data.email}</p>
                          </UserStyled>
                        </InfoStyled>
                        <TimeStyled>Time stamp [{moment(ele.created_at).format('DD MMM YYYY HH:mm:ss A')}]</TimeStyled>
                        {Object.values(ele.user_options).length > 0 && (
                          <ActionStyled>
                            <Button kind='danger' size='small' onClick={() => handleCanAcceptCanDeny(ele.id, ele.user_options.reject)}>Deny</Button>
                            <Button kind='primary' size='small' onClick={() => handleCanAcceptCanDeny(ele.id, ele.user_options.accept)}>Accept</Button>
                          </ActionStyled>
                        )}
                      </>
                    }
                    iconDescription="describes the close button"
                    subtitle={ele.message}
                    timeout={0}
                    title={ele.title}
                    onCloseButtonClick={() => handleSeen(ele.mark_seen)}
                  />
                </Fragment>
              ))}
            </PanelStyled>
            {/* <PanelStyled>
              <TopStyled>
                <TitleStyled>Today</TitleStyled>
                <DismissStyled onClick={() => {}}>Dismiss all</DismissStyled>
              </TopStyled>
              <ToastNotification
                kind="error"
                caption={<span>Time stamp [00:00:00 AM]</span>}
                iconDescription="describes the close button"
                subtitle="Rouis abnta a mod temport asdsito incide lditl."
                timeout={0}
                title="Error notification"
                onCloseButtonClick={() => console.log('close error notifcation')}
              />
            </PanelStyled>
            <PanelStyled>
              <TopStyled>
                <TitleStyled textColor="#5596e6">Collaboration ({data['Collaboration'].length})</TitleStyled>
              </TopStyled>
              {renderNotify(data, 'Collaboration')}
            </PanelStyled>
            <PanelStyled>
              <TopStyled>
                <TitleStyled textColor="#5596e6">Simulation ({data['Simulation'].length})</TitleStyled>
              </TopStyled>
              {renderNotify(data, 'Simulation')}
            </PanelStyled>
            <PanelStyled>
              <TopStyled>
                <TitleStyled textColor="#5596e6">Billing ({data['Billing'].length})</TitleStyled>
              </TopStyled>
              {renderNotify(data, 'Billing')}
            </PanelStyled> */}
            <TopStyled>
              <ViewStyled onClick={handleSeenAll}>View all</ViewStyled>
              <SettingStyled>
                <PopoverButton
                  popoverPosition="notification"
                  icon={<SettingsIcon />}
                  content={
                    <>
                      <ButtonStyled type="button" onClick={() => {}}>
                        Option 1
                      </ButtonStyled>
                      <ButtonStyled type="button" onClick={() => {}}>
                        Option 2
                      </ButtonStyled>
                    </>
                  }
                />
              </SettingStyled>
            </TopStyled>
          </>
        ) : (
          <NoteStyled>
            You don't no notification
          </NoteStyled>
        )}
      </ContentStyled>
    </ContainerStyled>
  )
}

export default Notification;