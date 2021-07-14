import React, { useState, useEffect, useRef } from 'react'
import {useAuth} from "../../context/AuthContext";
import styled from "styled-components"
import { StyledButton, StyledTitle, Link, StyledText } from "../../components/designSystem/mobileDS";
import NotificationsIcon from '@material-ui/icons/Notifications';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { NotificationWindow } from "./notificationWindow";
import useSound from 'use-sound';

const colors = {
    main_cta: "#E71C7D", bg: "#FAF0E4", text: "#333331", accent: "#F8F7F5", link: "#00397B",
    shadow_main: "#E993B1", shadow_orange: "#F16643", shadow_teal: "#0891A8", shadow_yellow: "#FBE536",
    pink_hover: "#FD35BD", light_gray: "#D8D8D8", dark_gray: "#666662"
};


const NotiBarContainer = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 60px;
    margin-left: 0px;
    background:`+colors.color+` ;
`;

const RedDot = styled.div`
    height: 9px;
    width: 9px;
    background: #E71C96;
    border-radius: 50%;
    position: absolute;
    top: 5;
    left: 2;
   
`;

const BellContainer = styled.div`
  display: flex;
  align-items: center;
`;


const Bell = () => (
    <div>
        <NotificationsIcon className="iconDesign"/>
    </div>
)

const Dot = () => (
    <RedDot></RedDot>
  )

const JoinFriends = () => (
    <div>
        <GroupAddIcon className="iconDesign"/>
    </div>
)


const defaultOnClick = () => alert("onClick is undefined")

const NotificationIndicator = ({
    showDot = false,
    onClick = defaultOnClick,
  }) => {
    const dot = showDot ? <Dot /> : null
    const divStyle = {
        height: "24px",
        width: "24px",
        border: "1 solid black",
        position: "relative",
        display: "flex",
        justifyContent: "top",
        alignItems: "top",
    }
    return (
        <div>
            <div
            className="notiButton"
            >
            <div style={divStyle}>
                {dot}
                <Bell />
            </div>
            </div>
        </div>
        )
    }

    
function NotificationBar(props) {
    const {userData, usePrevious} = useAuth();
    const [show, setShow] = useState(false);
    const [showDot, setShowDot] = useState(false)
    const [notiData, setNotiData] = useState([])
    const [color, setColor] = useState("");
    
    // error here
    const [play] = useSound('../../audio/piano.mp3', {
        onPlayError: () => {console.log("error audio")}})

    const prevNoti = usePrevious(notiData)
    
    
    //shadow_main: "#E993B1", shadow_orange: "#F16643", shadow_teal: "#0891A8", shadow_yellow: "#FBE536",
    useEffect(() => { 
        const whatIsTheHour = () => {
            var date = new Date();
            const nowHour = date.getHours();
            if (nowHour >= 5 && nowHour < 12) {
                setColor("shadow_main");
            } else if (nowHour >= 12 && nowHour < 17) {
                setColor("shadow_orange");
            } else if (nowHour >= 17 && nowHour < 20) {
                setColor("shadow_teal");
            } else {
                setColor("shadow_yellow");
            }
        };
        whatIsTheHour();

    }, [userData, color])
    
    
    useEffect(() => {
        const isEqual = (notiPrev, notiNew) => {
            return( notiPrev && notiNew && notiPrev.length === notiNew.length 
                && notiPrev.every((v,i)=> v === notiNew[i]))
        }

        const fetchNotification = () =>{
            if (userData == null){return}
            const noti = userData.notification
            const isNewNoti = isEqual(prevNoti, noti)
            setNotiData(noti)
            setShowDot(!isNewNoti)
            if (isNewNoti){
                play()
            };
        }
        fetchNotification();
    }, [userData, prevNoti, showDot, show])
    
    const closeWindow = () => {
        setShow(!show);
        play();
    }

    return (
            <NotiBarContainer>
                <BellContainer>
                    <button className="BellButton" style={{border:"none"}} onClick={closeWindow}><NotificationIndicator showDot={showDot} onClick={()=> setShowDot(false)}/></button>                        
                    <NotificationWindow show={show} showDot={setShowDot} notiData={notiData} closeWindow={closeWindow}/>
                </BellContainer>
                <JoinFriends>
                    <button className="BellButton" style={{border:"none"}}>
                        <div>
                            <JoinFriends/>
                        </div>
                    </button>
                </JoinFriends>
            </NotiBarContainer>
        );
    }

export default NotificationBar;