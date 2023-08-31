import React, { useRef } from "react";
import {
  Link as LinkScroll,
  Element,
  Events,
  animateScroll as scroll,
  scroller,
} from "react-scroll";
import Typed from "react-typed";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import ChatIcon from "@mui/icons-material/Chat";
import Logo from "../../../public/assets/VihigaLogo.png";
import NewsAndEvents from "./NewsAndEvents";
import StaffDirectory from "./StaffDirectory";
import JobRequests from "./JobRequests";

const Home = () => {
  const { USERS, loadingUSERS } = useOutletContext();
  const NewsAndEventsRef = useRef();
  const StaffDirectoryRef = useRef();
  const JobRequestsRef = useRef();
  const navigate = useNavigate();
  const [state, setState] = React.useState([
    { text: "Chat", icon: () => <PhonelinkIcon />, link: "/chatpage" },
    {
      text: "News & Events",
      icon: () => <PhonelinkIcon />,
      link: "NewsAndEvents",
    },
    {
      text: "Staff DIrectory",
      icon: () => <PhonelinkIcon />,
      link: "StaffDirectory",
    },
    {
      text: "Job Requests",
      icon: () => <PhonelinkIcon />,
      link: "JobRequests",
    },
    {
      text: "News & Events",
      icon: () => <PhonelinkIcon />,
      link: "NewsAndEvents",
    },
  ]);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  const handleScrollToBottom = () => {
    StaffDirectoryRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToElement = () => {
    scroller.scrollTo("JobRequests", {
      duration: 500,
      delay: 100,
      smooth: true,
      // containerId: 'ContainerElementID',
      offset: 50, // Scrolls to element + 50 pixels down the page
    });
  };
  return (
    <>
      <div className="relative flex flex-row overflow-clip h-[85vh]">
        <div className="w-[60vw] flex ">
          <img
            onClick={scrollToElement}
            src={Logo}
            alt="logo"
            className="flex-1 opacity-60 filter-blur "
          />
        </div>
        <div className="z-10 w-[45vw]   absolute h-full right-0 bg-slate-800/5 flex flex-col justify-center -translate-x-[5vw]s ">
          <p className="text-7xl font-bold font-">Welcome to</p>
          <p className="text-5xl font-semibold">Vihiga County</p>
          <Typed
            className="text-primary/50 text-2xl font-semibold "
            strings={["Here you can find anything", "He you", "Chat", "News And Events"]}
            typeSpeed={40}
            loop
            backSpeed={50}
          />
        </div>
      </div>

      {!loadingUSERS && (
        <>
          <Element name="NewsAndEvents">
            <NewsAndEvents />
          </Element>
          <Element className="my-10 w-[100vw]d p-6 bg-white" name="StaffDirectory">
            <StaffDirectory />
          </Element>
          <Element className="my-4" name="JobRequests">
            <JobRequests />
          </Element>
        </>
      )}
    </>
  );
};

export default Home;
