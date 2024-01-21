import NavBar from "../Employees/components/NavBar";
import Header from "../Employees/components/Header";
import "../Style/productstyle.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddLand from "../components/Product Component/AddLand";
import EmployeeTabbedLand from "../components/Product Component/Tab Land/EmployeeTabbedLand"
import AddProduct from "../components/Product Component/AddProduct";
import axios from "axios";
import { IP } from "../App";
import { PlanInfo } from "../components/Product Component/PlanInfo";
import plantImage from "../Images/product/plant.png";



function Product() {
  const [activeTab, setActiveTab] = useState("");
  const [activeJob, setActiveJob] = useState()
  const [lands, setLands] = useState([]);
  const [landInfo, setLandInfo] = useState({
    uuid: "",
    title: "",
    address: "",
    x_coordinate: 45.4303447995166,
    y_coordinate: -75.69932769298879,
  });
  const [selectedLand, setSelectedLand] = useState({
    uuid: activeTab,
    type: "",
  });

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    uuid: "",
    type: "show",
  });
  const [productInfo, setProductInfo] = useState();
  const [tasks, setTasks] = useState();
  const [timeLine, setTimeLine] = useState();
  const [temp, setTemp] = useState()

  const fetchLands = async (uuid) => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(`${IP}/product/lands/`, {
        headers,
      });
      if (response.status === 200) {
        setLands(response.data.Lands);
        console.log(response)
        if (response.data.Lands.length > 0) {
          if (uuid === "0") {
            setLandInfo(response.data.Lands[0]);
            setActiveTab(response.data.Lands[0].uuid);
            getWeather(response.data.Lands[0].uuid)
            getActiveJob(response.data.Lands[0].uuid)
          } else {
            console.log(uuid);
            setActiveTab(uuid);
          }
        }
      }

    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  };
  const fetchProducts = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(
        `${IP}/product/landsproducts/${activeTab}`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        console.log(response)
        if (response.data.products.length > 0) {
          setProducts(response.data.products);
          console.log(response)

          setSelectedProduct({
            uuid: response.data.products[0].uuid,
            type: "show",
          });
        } else {

          setProductInfo(undefined);
          setTasks(undefined);
          setTimeLine(undefined);
        }
      }

    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  };
  const [imgProduct, setImageProduct] = useState()
  const [soliwind, setSoliwind] = useState()

  const getSiloPerc = async (uuid) => {

    const access = localStorage.getItem("access")
    const headers = {
      Authorization: `Bearer ${access}`
    };

    const body = {
      uuid: uuid
    }

    try {
      const response = await axios.post(
        `${IP}/send-sensor-data/`, body,
        {
          headers,
        }
      );

      if (response.status === 200) {
        console.log(response)
        setSoliwind(response.data)
        if (soliwind) {
          console.log(soliwind)
        }
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

  const fetchProductDetails = async () => {
    console.log(selectedProduct.uuid)
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`,
    };
    try {
      const response = await axios.get(
        `${IP}/product/productsdetails/${selectedProduct.uuid}`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setImageProduct(response.data.image_url)
        setProductInfo(response.data);
        setTasks(response.data.all_tasks);
        setTimeLine(response.data.timelines_tasks);
        getSiloPerc(response.data.product_info.uuid)
      }

      else {
        setProductInfo(undefined);
        setTasks(undefined);
        setTimeLine(undefined);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  };

  useEffect(() => {
    fetchLands("0");
    getSiloPerc()
  }, []);
  useEffect(() => {
    setLandInfo(lands.find((land) => land.uuid == activeTab));
    if (activeTab) {
      fetchProducts();
    }
  }, [activeTab]);
  useEffect(() => {
    fetchProductDetails();
  }, [selectedProduct]);

  const getWeather = async (uuid) => {

    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`
    };
    const body = {
      uuid: uuid
    }
    try {
      const response = await axios.post(`${IP}/weather-api/`, body, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
        setTemp(response.data)
        console.log(temp)
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

  const getActiveJob = async (uuid) => {

    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`
    };
    const body = {
      uuid: uuid
    }
    try {
      const response = await axios.post(`${IP}/land-active-task/`, body, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
        setActiveJob(response.data.count)
        console.log(activeJob)
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

  const onClickToggleActive = async (uuid) => {
    console.log(uuid)
    try {
      await setProducts("");
      setActiveTab(uuid);
      getWeather(uuid)
      getActiveJob(uuid)
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }


  function handleAddLand() {
    setSelectedLand({
      uuid: "",
      type: "add",
    });
    setLandInfo({
      uuid: "",
      title: "",
      address: "",
      x_coordinate: 45.4303447995166,
      y_coordinate: -75.69932769298879,
    });
  }
  function handleEditLand(uuid) {
    setLandInfo(lands.find((land) => land.uuid === uuid));
    setSelectedLand({ uuid: activeTab, type: "edit" });
  }
  function handleRemoveLand(uuid) {
    setLandInfo(lands.find((land) => land.uuid === uuid));
    setSelectedLand({ uuid: activeTab, type: "remove" });
  }
  function handleBack() {
    setSelectedLand({
      uuid: "",
      type: "",
    });
    setLandInfo({
      uuid: "",
      title: "",
      address: "",
      x_coordinate: 45.4303447995166,
      y_coordinate: -75.69932769298879,
    });
  }
  //
  function onAddingLand() {
    addLand();
  }
  function onEditingLand() {
    editLand();
  }
  function onRemovingLand(uuid) {
    removeLand(uuid);
  }
  async function removeLand(uuid) {
    try {
      const access = localStorage.getItem("access");
      const headers = {
        Authorization: `Bearer ${access}`,
      };
      const response = await axios.delete(
        `${IP}/lands/delete/${uuid}`,
        {
          headers,
        }
      );
      if (response.status === 200) {
        successMessage("Deleting land was successful!");
        setSelectedLand({
          uuid: "",
          type: "",
        });
        setLandInfo({
          uuid: "",
          title: "",
          address: "",
          x_coordinate: 45.4303447995166,
          y_coordinate: -75.69932769298879,
        });
        fetchLands("0");
      }

    } catch (e) {
      errorMessage(e.message);
      if (e.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  }

  async function editLand() {
    const newLand = {
      lands_uuid: landInfo.uuid,
      address: landInfo.address,
      title: landInfo.title,
      x_coordinate: landInfo.x_coordinate,
      y_coordinate: landInfo.y_coordinate,
    };
    console.log(newLand);
    try {
      const access = localStorage.getItem("access");
      const headers = {
        Authorization: `Bearer ${access}`,
      };
      const response = await axios.put(`${IP}/lands/`, newLand, {
        headers,
      });
      if (response.status === 200) {
        successMessage(response.data.message);
        setSelectedLand({
          uuid: "",
          type: "",
        });
        let uuid = landInfo.uuid;
        setLandInfo({
          uuid: "",
          title: "",
          address: "",
          x_coordinate: 45.4303447995166,
          y_coordinate: -75.69932769298879,
        });
        fetchLands(uuid);
      }

    } catch (e) {
      errorMessage(e.message);
      if (e.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  }

  async function addLand() {
    const newLand = {
      address: landInfo.address,
      title: landInfo.title,
      x_coordinate: landInfo.x_coordinate,
      y_coordinate: landInfo.y_coordinate,
    };
    try {
      const access = localStorage.getItem("access");
      const headers = {
        Authorization: `Bearer ${access}`,
      };
      const response = await axios.post(`${IP}/lands/`, newLand, {
        headers,
      });
      if (response.status === 201) {
        console.log(response.data);
        successMessage(response.data.message);
        setSelectedLand({
          uuid: "",
          type: "",
        });
        setLandInfo({
          uuid: "",
          title: "",
          address: "",
          x_coordinate: 45.4303447995166,
          y_coordinate: -75.69932769298879,
        });
        fetchLands(response.data.lands_uuid);
      }

    } catch (e) {
      errorMessage(e.message);
      if (e.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh')
        window.location.href = "/login"
      }
    }
  }

  function handleChangeLandInfo(info) {
    setLandInfo(info);
  }

  function handleAddProduct() {
    setSelectedProduct({
      uuid: "",
      type: "add",
    });
  }
  function handleEditProduct(uuid) {
    setLandInfo(products.find((product) => product.uuid === uuid));
    setSelectedProduct({ uuid: uuid, type: "edit" });
  }
  function handleRemoveProduct(uuid) {
    setProductInfo(products.find((product) => product.uuid === uuid));
    setSelectedProduct({ uuid: uuid, type: "remove" });
  }
  function handleBackProduct() {

    fetchLands("0");
    if (selectedProduct.type === "add") {
      if (products.length > 0) {
        setSelectedProduct({
          uuid: products[0].uuid,
          type: "show",
        });
        setProductInfo(products[1]);
      } else {
        setSelectedProduct({
          uuid: "",
          type: "show",
        });
        setProductInfo();
      }
    } else {
      setSelectedProduct({ uuid: selectedProduct.uuid, type: "show" });
    }
  }

  function handleChangeProductInfo(info) {
    setProductInfo(info);
  }
  function handleClickProduct(uuid) {
    setSelectedProduct({ uuid: uuid, type: "show" });
    setProductInfo(products.find((product) => product.uuid === uuid));
  }


  return (
    lands && (
      <div className="d-flex">
        <div className="d-none d-lg-block">
          <NavBar />
        </div>
        <div className="w-100 ">
          <Header></Header>
          <ToastContainer />

          {selectedLand && selectedLand.type !== "" ? (
            <AddLand
              landInfo={landInfo}
              selectedLand={selectedLand}
              onBack={handleBack}
              onChange={handleChangeLandInfo}
              addingLand={onAddingLand}
              edditingLand={onEditingLand}
              removingLand={onRemovingLand}
            />
          ) : selectedProduct && selectedProduct.type !== "show" ? (
            <AddProduct
              productInfo={productInfo}
              selectedProduct={selectedProduct}
              onBack={handleBackProduct}
              onChange={handleChangeProductInfo}
            />
          ) : (
            <Container className="w-100">
              <EmployeeTabbedLand
                lands={lands}
                setActiveTab={onClickToggleActive}
                activeTab={activeTab}
                onAddLand={handleAddLand}
                onEditLand={handleEditLand}
                onDeleteLand={handleRemoveLand}
              >
                <Row className="mt-3">
                  <Col xs={12} md={6}>
                    <Predictions temp={temp} activeJob={activeJob} soliwind={soliwind} />
                  </Col>
                  <Col xs={12} md={6}>

                    <AllProducts
                      products={products}
                      onAddProduct={handleAddProduct}
                      onEditProduct={handleEditProduct}
                      onRemoveProduct={handleRemoveProduct}
                      selectedProduct={selectedProduct}
                      onProduct={handleClickProduct}
                    />
                  </Col>
                </Row>
                {productInfo && tasks && timeLine ? (
                  <>
                    <SelectedProduct productInfo={productInfo} tasks={tasks} imgProduct={imgProduct} />
                    <TimeLine tasks={timeLine} />
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </EmployeeTabbedLand>
            </Container>
          )}
        </div>
      </div>
    )
  );
}
function Predictions({ temp, activeJob, soliwind }) {
  return (
    <Row className="overflow-y-scroll px-3 px-sm-2 px-lg-1 px-md-0 predictions-height mb-3">
      <Col xs={12} lg={6} className="px-0 px-lg-4">
        <PlanInfo
          pClassName="w-100 mb-3"
          className="s11"
          quality="good"
          amount={temp ? (Math.round(temp.temperature - 275.15)) : ""}
          title="Air Temp"
        >
          <i className="bi bi-thermometer-half fs-3"></i>
        </PlanInfo>
      </Col>
      <Col xs={12} lg={6} className="px-0 px-lg-4">
        <PlanInfo
          pClassName="w-100 mb-3 "
          className="s12"
          quality="high"
          amount={activeJob ? activeJob : "0"}
          title="Active Tasks"
        >
          <i className="bi bi-fire fs-3"></i>
        </PlanInfo>
      </Col>
      <Col xs={12} lg={6} className="px-0 px-lg-4">
        <PlanInfo
          pClassName="w-100 mb-3 rounded-3 "
          className="s13"
          quality="good"
          amount={soliwind && soliwind.wind_speed ? soliwind.wind_speed.value : ""}
          title="Soil Moisture"
        >
          <i className="bi bi-cloud-drizzle fs-3"></i>
        </PlanInfo>
      </Col>
      <Col xs={12} lg={6} className="px-0 px-lg-4">
        <PlanInfo
          pClassName="w-100 mb-3 "
          className="s14"
          quality="low"
          amount={soliwind && soliwind.soil_moisture_data ? soliwind.soil_moisture_data.value : ""}
          title="Precipitation"
        >
          <i className="bi  bi-wind fs-3"></i>
        </PlanInfo>
      </Col>
    </Row>
  );
}
function AllProducts({
  products,
  onAddProduct,
  selectedProduct,
  onProduct,
  onEditProduct,
  onRemoveProduct,
}) {
  return (
    <div className=" shadow p-3 mb-2">
      <div className="header-products border-primary2-bottom">
        <h4 className="text-prim2">Products</h4>
      </div>
      <div className="product-content">
        <ul className="overflow-y-scroll list-unstyled product-height mt-2">
          {Array.from({ length: products.length }, (_, i) => (
            <ProductsLi
              key={i}
              productInfo={products[i]}
              selectedProduct={selectedProduct}
              onProduct={onProduct}
              onEdit={onEditProduct}
              onRemove={onRemoveProduct}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
function ProductsLi({
  productInfo,
  onEdit,
  onRemove,
  selectedProduct,
  onProduct,
}) {
  return (
    <li
      className={`productEmployee ${productInfo.uuid === selectedProduct.uuid ? `activeProduct` : ``
        }`}
    >
      <span onClick={() => onProduct(productInfo.uuid)}>
        {productInfo.name}
      </span>
    </li>
  );
}

function SelectedProduct({ productInfo, tasks, imgProduct }) {
  return (
    <div className="productcardnew">
      <Col
        xs={12}
        lg={2}
        className="d-none d-lg-flex justify-content-center align-items-center"
      >
        <img src={plantImage} alt="test" className="img-fluid" />
      </Col>
      <Col xs={12} lg={5} className="h-100 mb-2 mb-lg-0">
        <div className="details_card h-100  mx-0 mx-md-2 mx-lg-3 mx-xl-4 mx-xxl-5">
          <Row className="flex-row details-height">
            <Col xs={6} className="flex-custome">
              <img src={imgProduct ? `${IP}${imgProduct}` : "src/Images/product/wheat.svg"} className="product-img" alt="product" />
            </Col>
            <Col
              xs={5}
              className="d-flex align-items-start justify-content-center flex-column"
            >
              {productInfo && productInfo.product_info && (
                <>
                  <div className="product_info">
                    <span>Crop:</span>
                    <span>{productInfo.product_info.name}</span>
                  </div>
                  <div className="product_info">
                    <span>Start Date:</span>
                    <span>{productInfo.product_info.sow_date}</span>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </div>
      </Col>
      <Col xs={12} lg={5} className="h-100 mb-2 mb-lg-0">
        <div className="details_card h-100 mx-0 mx-md-2 mx-lg-3 mx-xl-4 mx-xxl-5">
          <div className="details-height py-2 px-3 ">
            <div className="border-primary2-diff">
              <h6 className="color-diff">Planned Activities</h6>
            </div>
            <ul className="overflow-y-scroll-task list-unstyled tasks-list">
              {Array.from({ length: tasks.length }, (_, i) => (
                <TasksLI taskInfo={tasks[i]} key={i} />
              ))}
            </ul>
          </div>
        </div>
      </Col>
    </div>
  );
}
function TasksLI({ taskInfo }) {
  return (
    <li className="tasks-list-item">
      <div className="task-list-detail">
        <span className="task-title">{taskInfo.title}</span>
        <div className="task-status">
          <span
            className={`${taskInfo.status == "A"
              ? ` text-success`
              : taskInfo.remaining_days === 0 && taskInfo.status == "P"
                ? ` text-danger`
                : taskInfo.status == "R"
                  ? ` text-danger`
                  : ` text-warning`
              }`}
          >
            {taskInfo.status == "P" && taskInfo.remaining_days > 0
              ? `Remaining Days: ${taskInfo.remaining_days}`
              : taskInfo.status == "P" && taskInfo.remaining_days === 0
                ? "Expired!"
                : taskInfo.status == "A"
                  ? "Done!"
                  : taskInfo.status == "C"
                    ? "Waiting..."
                    : "Rejected!"}
          </span>
        </div>
      </div>
      <i
        className={`fs-5 bi ${taskInfo.status == "A"
          ? `bi-check2-circle text-success`
          : taskInfo.status == "R" || taskInfo.remaining_days === 0
            ? `bi-x-circle text-danger`
            : `bi-exclamation-circle text-warning`
          }`}
      ></i>
    </li>
  );
}
function TimeLine({ tasks }) {

  return (
    <>
      {tasks.length > 0 &&
        <div className="time_line rounded-3 my-2">
          <div className="timeline_weeks w-100">
            {tasks.map((task, i) => (
              <TimeWeeksInfo key={i} task={task} />
            ))}

          </div>
          <div className="timeline_info w-100">
            {Array.from({ length: time_info.length }, (_, i) => (
              <TimeLineInfo
                text={time_info[i].text}
                color={time_info[i].color}
                key={i}
              />
            ))}
          </div>
        </div>
      }
    </>

  );
}
function TimeWeeksInfo({ task }) {

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {

    const dateObject = new Date(task.start_date);
    const options = { month: 'long', day: '2-digit' };

    setMonth(new Intl.DateTimeFormat('en', { month: 'long' }).format(dateObject));
    setDay(dateObject.getDate().toString());
  }, [task.end_date]);

  return (
    <div style={{ textAlign: "center" }} className="weeks_card">
      <div className="text_muted">{month}</div>
      <div className={task.status === "P" ? "pending" : "approved"}>
        <div className="px-2 py-3 cal text_muted">{day}</div>
      </div>
    </div>
  );
}

function TimeLineInfo({
  color = "black",
  text = "",
  text_class = "fs-6 ms-1",
  circle_class = "rounded-circle",
  width = 12,
  height = 12,
}) {
  return (
    <div className="d-flex align-items-center mx-2">
      <div
        className={`${circle_class}`}
        style={{
          background: `${color}`,
          width: `${width}px`,
          height: `${height}px`,
        }}
      ></div>
      <div className={`${text_class}`} style={{ fontWeight: 500 }}>
        {text}
      </div>
    </div>
  );
}
export default Product;

const time_info = [
  { uuid: 1, color: "#5DA25E", text: "Aprrove" },
  { uuid: 2, color: "#FFDA84", text: "Pending" },
];
const time_weeks_info = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
function errorMessage(text) {
  toast.error(text, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
function warningMessage(text) {
  toast.warning(text, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
function successMessage(text) {
  toast.success(text, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}
//bi bi-cloud-drizzle fs-3