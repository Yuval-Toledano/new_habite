import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import Teal from "../../components/svgs/mobileBackgrounds/Teal.svg";
import NotificationBarWhite from "../../components/MobileNotification/NotificationBarWhite";
import { BackgroundCircle, FlyingBox, StyledButton, StyledTextCentered } from "../../components/designSystem/mobileDS";
import { MobileInfoBox } from "../../components/mobileComponents/mobileInfoBox/mobileInfoBox";
import { MobileLeaderboard } from "../../components/mobileComponents/mobileLeaderboard/mobileLeaderboard";
import { TopThree } from "../../components/mobileComponents/mobileLeaderboard/topThree";
import { MobileUserDetailsHeader } from "../../components/mobileUserDetailesHeader/mobileUserDetailsHeader";
import "../../index.css"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BugReportIcon from '@material-ui/icons/BugReport';

// Mobile overview container
export default function MobileOverview() {

    const { groupData, logOut } = useAuth();
    const history = useHistory();
    const groupCount = groupData ? groupData.countGroup : "No group count";

    // to send users to the bug report page
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }
    const bugLink = "https://docs.google.com/forms/d/e/1FAIpQLSejCMRe7KhMYlhLTL9ves71UXPS3TP5hkX8DGrermyF98QAjw/viewform"

    // logout user
    async function handleLogOut(event){
        event.preventDefault();
        try {
            await logOut();
            history.push("/")
        } catch(err){
            console.error("Error with logout ", err)
        }
    }

    // if there are more than 1 member in the group, show the group window with challenges and scoreboard
    if (groupCount > 1) {
        return (
            <div>
                {/* NotificationBar starts here */}
                <NotificationBarWhite/>
                {/* NotificationBar ends here */}
                <FlyingBox zindx={1} top={50}>
                    <MobileUserDetailsHeader/>
                    <MobileInfoBox type="currChallenge" />
                    <div style={{textAlign: 'center', height: '5%'}}><StyledTextCentered>My group scoreboard 🏆</StyledTextCentered></div>
                    <TopThree />
                    <MobileLeaderboard/>
                    <div className="d-flex flex-row justify-content-center m-2 mb-4">
                        <StyledButton type="secondary" color="rgba(231, 28, 125, 0.6)" onClick={() => openInNewTab(bugLink)}><BugReportIcon />&nbsp;Report</StyledButton>
                        <StyledButton type="secondary" color="rgba(231, 28, 125, 0.6)" onClick={(event) => handleLogOut(event)}><ExitToAppIcon />&nbsp;logout</StyledButton>
                    </div>
                </FlyingBox>
    
                <BackgroundCircle src={Teal} alt="Upper background color" />
            </div>
        );
    // else, encourage user to invite their friends to the group
    } else {
        return (
            <div>
                {/* NotificationBar starts here */}
                <NotificationBarWhite/>
                {/* NotificationBar ends here */}
                <FlyingBox zindx={1} top={50}>
                    <MobileUserDetailsHeader/>
                    <MobileInfoBox type="groupAdd" />
                    <div className="d-flex flex-row justify-content-center m-2">
                        <StyledButton type="secondary" color="rgba(231, 28, 125, 0.6)" onClick={(event) => handleLogOut(event)}><ExitToAppIcon />&nbsp;logout</StyledButton>
                        <StyledButton type="secondary" color="rgba(231, 28, 125, 0.6)" onClick={() => openInNewTab(bugLink)}><BugReportIcon />&nbsp;Report</StyledButton>
                    </div>
                </FlyingBox>
    
                <BackgroundCircle src={Teal} alt="Upper background color" />
            </div>
        );
    }
}