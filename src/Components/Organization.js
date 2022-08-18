import React, { useState } from "react";
import Footer from "./Footer";
import Notifications from "../assets/Notification.png";
import Settings from "../assets/Setting.png";
import Resumee from "../assets/Resume.png";
import Notification from "../Components/Notifications";
import Profilee from "../assets/Profile.png";
import Jobs from "./Jobs";
import AllJobs from "./AllJobs";
import Profile2 from "./Profile2";
import Setting from "./Setting";
import NavBarComponent from "./NavBarComponent";
import NavBarComponent2 from "./NavBarComponent2";

const Organization = (props) => {
  const [check, setCheck] = useState('AllJobs');
  const [show, setShow] = useState(true);
  const [Job, setJob] = useState(true);
  const [tabs, setTabs] = useState("AllJobs");

  console.log("-----handleOnSave------", show);
  console.log("-----tabs------", tabs);

  return (
    <>
      <NavBarComponent2 />
      <div className="profileHeader">
        <h2 style={{ fontWeight: 600 }}>organization </h2>
      </div>
      <div className="row m-0">
        <div className="col-md-2 bg-Gray">
          <div style={{ marginTop: "30px" }}>
            <button
              className={
                check === "Profile2"
                  ? "Account-button Account-button-border bg-White"
                  : "Account-button"
              }
              onClick={() => setCheck("Profile2")}
            >
              <div className="Account-Tabs">
                <img src={Profilee} height="30px" width="30px" alt="" />
                <p className="m-l-2">Edit Your Profile</p>
              </div>
            </button>

            <button
              className={
                check === "AllJobs"
                  ? "Account-button Account-button-border bg-White"
                  : "Account-button"
              }
              onClick={() => {
                setCheck("AllJobs");
                setTabs("AllJobs");
              }}
            >
              <div className="Account-Tabs m-l-07">
                <img src={Resumee} height="20px" width="20px" />
                <p className="m-l-2">Control Jobs</p>
              </div>
            </button>

            <button
              className={
                check === "Notifications"
                  ? "Account-button Account-button-border bg-White"
                  : "Account-button"
              }
              onClick={() => {
                setCheck("Notifications");
                setTabs("Notificcations");
              }}
            >
              <div className="Account-Tabs m-l-07">
                <img src={Notifications} height="20px" width="20px" />
                <p className="m-l-2">Notifications</p>
              </div>
            </button>

            <button
              className={
                check === "Setting"
                  ? "Account-button Account-button-border bg-White"
                  : "Account-button"
              }
              onClick={() => {
                setCheck("Setting");
                setTabs("Setting");
              }}
            >
              <div className="Account-Tabs m-l-07">
                <img src={Settings} height="20px" width="20px" />
                <p className="m-l-2">Settings</p>
              </div>
            </button>
          </div>
        </div>

        <div class="col-md-10">
          {check === "Profile2" && <Profile2 />}
          {check === "Job" && <Jobs />}
          {check === "AllJobs" && <AllJobs />}
          {check === "Notifications" && <Notification />}
          {check === "Setting" && <Setting />}
        </div>
      </div>
      <footer>
        <Footer dark={true} />
      </footer>
    </>
  );
};

export default Organization;
//create Resume Page code
// {check === 'Resume' &&
// show ?
// <CreateResume onChangeStatus= {(val) => setShow(val) }/>
// :
// showupload ?
// <ResumeView onChangeStatus={(val) => setShowUpload(val)}/>  : <Resume />
// }
