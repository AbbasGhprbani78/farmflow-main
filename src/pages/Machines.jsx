import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import { Tabs, Tab, DropdownButton, Dropdown } from 'react-bootstrap';
import BoxMachines from "../components/BoxMachines/BoxMachines";
import AddBoxBtn from "../components/AddBoxBtn/AddBoxBtn";
import axios from "axios";
import '../Style/Machines.css'
import { IP } from '../App'
import Loading from "../components/Laoding/Loading";
import Chart from "./Chart/Chart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Machines() {

  const [loading, setLoading] = useState(true)
  const [boxMachin, setBoxMachin] = useState([])
  const [selectedTab, setSelectedTab] = useState("M")
  const [newBoxIndex, setNewBoxIndex] = useState(null);
  const [defaultImg, setDefaultImg] = useState(`src/components//BoxMachines/download.png`)
  const [defaultPdf, setDefaultPdf] = useState();
  const [defaultStatus, setDefaultStatus] = useState(["IU", "A", "UM"])
  const [defaultModel, setDefaultModel] = useState("")
  const [example, setExample] = useState()
  const [getData, setGetData] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedTabName, setSelectedTabName] = useState('Machinery');

  const getAllBox = async () => {
    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {
      const response = await axios.get(`${IP}/modify-tool/${selectedTab}`, {
        headers,
      })

      if (response.status === 200) {

        console.log(response)
        setBoxMachin(response.data.map(item => ({
          ...item,
          land: [{ uuid: item.land.uuid, name: item.land.title }],
          employee: [{ uuid: item.employee.uuid, username: item.employee.username }],
          name: [{ id: item.name.id, name: item.name.name }],
          status: [item.status]
        })))
        setLoading(false)

      }

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAllBox()

  }, [selectedTab])

  const deleteBoxhandler = (uuid) => {
    let mainBoxes = boxMachin.filter(box => {
      return box.uuid !== uuid
    })
    setBoxMachin(mainBoxes)

  }
  const handleTabSelect = (selectedKey) => {

    let newSelectedTab;

    switch (selectedKey) {
      case 'Machinery':
        newSelectedTab = 'M';
        break;
      case 'vehicles':
        newSelectedTab = 'V';
        break;
      case 'Samrt Monitoring Device':
        newSelectedTab = 'S';
        break;
      case 'Tools And Implements':
        newSelectedTab = 'T';
        break;
      case 'Report':
        newSelectedTab = 'R';
        break;
      default:
        newSelectedTab = selectedKey;
    }


    setSelectedTab(newSelectedTab);
    console.log(selectedTab)
  };

  const getFilds = async () => {

    const uuid = localStorage.getItem('uuid')
    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`
    };
    const body = {
      type: selectedTab,
      manager: uuid
    }

    try {
      const response = await axios.post(`${IP}/get-tools/`, body, {
        headers,
      })

      if (response.status === 200) {
        setExample(response.data)
        setGetData(response.data)
        console.log(response)
      }

    } catch (error) {
      console.log(error)
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  }

  useEffect(() => {
    getFilds()
  }, [])

  const AddBoxHandler = () => {

    const landArray = getData.lands
    const employeeArrey = getData.employee
    const nameArrey = getData.tools

    const newBox = {

      isNew: true,
      manual: defaultPdf,
      image: defaultImg,
      status: defaultStatus,
      model: defaultModel,
      land: landArray,
      employee: employeeArrey,
      name: nameArrey,
      id: boxMachin.length + 1
    }

    setBoxMachin(prevState => {
      const newIndex = prevState.length;
      setNewBoxIndex(newIndex);
      return [...prevState, newBox];
    });
  }

  const handleTabSelectDropdown = (eventKey) => {
    handleTabSelect(eventKey);
    setSelectedTabName(eventKey)
  };


  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  const isMobile = windowWidth <= 576;

  const renderDropdownOrTabs = () => {
    if (isMobile) {
      return (
        <DropdownButton
          defaultActiveKey="Machinery"
          id="fill-tab-example"
          onSelect={handleTabSelectDropdown}
          title={selectedTabName}
          className="dropMachine"

        >
          <Dropdown.Item eventKey="Machinery">Machinery</Dropdown.Item>
          <Dropdown.Item eventKey="vehicles">Vehicles</Dropdown.Item>
          <Dropdown.Item eventKey="Samrt Monitoring Device">Smart Monitoring Device</Dropdown.Item>
          <Dropdown.Item eventKey="Tools And Implements">Tools And Implements</Dropdown.Item>
          <Dropdown.Item eventKey="Report">Report</Dropdown.Item>
        </DropdownButton>
      );
    } else {
      return (
        <Tabs
          id="controlled-tab-example"
          activeKey={selectedTabName}
          onSelect={handleTabSelect}
          className="mb-3"
        >
          <Tab eventKey="Machinery" title="Machinery" className={selectedTabName === "Machinery" ? "custom-active-tab" : ""}></Tab>
          <Tab eventKey="vehicles" title="Vehicles" className={selectedTabName === "vehicles" ? "custom-active-tab" : ""}></Tab>
          <Tab eventKey="Samrt Monitoring Device" title="Smart Monitoring Device" className={selectedTabName === "Samrt Monitoring Device" ? "custom-active-tab" : ""}></Tab>
          <Tab eventKey="Tools And Implements" title="Tools And Implements" className={selectedTabName === "Tools And Implements" ? "custom-active-tab" : ""}></Tab>
          <Tab eventKey="Report" title="Report" className={selectedTabName === "Report" ? "custom-active-tab" : ""}></Tab>
        </Tabs>
      );
    }
  };

  return (
    <>
      <ToastContainer />
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="d-flex">
          <div className="d-none d-lg-block">
            <NavBar />
          </div>
          <div className="w-100">
            <Header></Header>
            {renderDropdownOrTabs()}
            {selectedTab === "R" ? (
              <Chart />
            ) : (
              <>
                <AddBoxBtn onAddBox={AddBoxHandler} />
                {boxMachin.map((Box, i) => (
                  <BoxMachines
                    key={i}
                    {...Box}
                    onDelete={deleteBoxhandler}
                    selectedTab={selectedTab}
                    getAllBox={getAllBox}
                    example={example}
                    isNew={Box.isNew}
                    index={i}
                    newBoxIndex={newBoxIndex}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Machines;