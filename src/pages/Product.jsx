import NavBar from "../components/NavBar";
import Header from "../components/Header";
import "../Style/productstyle.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddLand from "../components/Product Component/AddLand";
import TabbedLand from "../components/Product Component/Tab Land/TabbedLand";
import AddProduct from "../components/Product Component/AddProduct";
import axios from "axios";
import { IP } from "../App";
import { PlanInfo } from "../components/Product Component/PlanInfo";
import plantImage from "../Images/product/plant.png";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import '../Style/ModalEdit.css'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Product() {
  const [activeTab, setActiveTab] = useState("");

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
  const [activeJob, setActiveJob] = useState()

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

    if (lands.length > 0) {
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
    } else {
      toast.warning("Please Add Land");
    }
  }

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
    console.log(info)
    console.log(landInfo)
  }

  function handleAddProduct() {
    setSelectedProduct({
      uuid: "",
      type: "add",
    });
  }

  const [defaultproduct, setDefaultProduct] = useState()
  const [defaultLand, setDefaultLand] = useState()
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveProductModal, setShowRemoveProductModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);
  const [nameLand, setNameLand] = useState()
  const [mainUuidProduct, setMainUuidProduct] = useState()
  const [productId, setProductId] = useState();
  const [productName, setProductName] = useState()
  const [productDate, setProductDate] = useState()
  const [productDec, setProductDec] = useState()
  const [productLand, setProductLand] = useState()
  const [edit, setEdit] = useState(false)
  const [temp, setTemp] = useState()

  const getDefaultInfo = async () => {
    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {
      const response = await axios.get(`${IP}/addproduct/`, {
        headers,

      });

      if (response.status === 200) {
        console.log(response);
        setDefaultProduct(response.data.products)
        setDefaultLand(response.data.lands)
        setProductId(response.data.products[0].id)
        setProductName(response.data.products[0].name)
        setProductLand(response.data.lands[0].uuid)

      }

    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh');
        window.location.href = "/login";
      }
    }
  }


  const handleProductChange = (e) => {

    const selectedProductId = e.target.value;

    setProductId(selectedProductId);

    const selectedProduct = defaultproduct.find(product => product.id == selectedProductId);

    setProductName(selectedProduct ? selectedProduct.name : '');
  };

  async function handleEditProduct(uuid) {
    setMainUuidProduct(uuid)

    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {
      const response = await axios.get(`${IP}/get-product-info/${uuid}`, {
        headers,

      });

      if (response.status === 200) {
        console.log(response);
        setProductLand(response.data.land)
        setProductId(response.data.product_name_id)
        setProductName(response.data.name)
        setProductDate(response.data.sow_date)
        setProductDec(response.data.description)

        if (productLand) {
          const landName = lands.find(land => land.uuid === productLand)
          setNameLand(landName)
          setShowEditModal(true)
        }
      }

    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh');
        window.location.href = "/login";
      }
    }

  }

  useEffect(() => {

  }, [])
  const sendEditProduct = async () => {

    if (!productDec) {
      errorMessage("Description cannot be empty!");
      return;
    }

    const access = localStorage.getItem("access");
    const headers = {
      Authorization: `Bearer ${access}`
    };

    const body = {
      id: productId,
      land: productLand,
      name: productName,
      uuid: mainUuidProduct,
      sow_date: productDate,
      description: productDec
    }

    console.log(body)

    try {
      const response = await axios.put(`${IP}/addproduct/`, body, {
        headers,

      });
      if (response.status === 200) {
        console.log(response);
        setProductId("")
        setProductName('')
        setProductDate("")
        setProductDec("")
        setProductLand("")
        setNameLand("")
        fetchLands("0")
        setDefaultProduct("")
        setDefaultLand("")
        setShowEditModal(false)
        successMessage("Edit successful!");
        setEdit(false)
        window.location.reload();
      }

    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh');
        window.location.href = "/login";
      }
    }

  };
  if (defaultproduct) {
    console.log(defaultproduct[0].id)
  }

  const handleRemoveProduct = (uuid) => {
    setProductToRemove(uuid);
    setShowRemoveProductModal(true);

  };

  const handleCloseRemoveProductModal = () => {
    setShowRemoveProductModal(false);
    setProductToRemove(null);
  };


  const handleSaveChange = async () => {

    const access = localStorage.getItem("access");

    const headers = {
      Authorization: `Bearer ${access}`
    };
    const body = {
      uuid: productToRemove
    };

    try {
      const response = await axios.delete(`${IP}/addproduct/`, {
        headers,
        data: body
      });

      if (response.status === 200) {
        console.log(response);
        fetchProducts()
        successMessage("delete successful!");
        window.location.reload()
      }

    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        localStorage.removeItem('access')
        localStorage.removeItem('uuid')
        localStorage.removeItem('refresh');
        window.location.href = "/login";
      }
    }
    handleCloseRemoveProductModal();
  };

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

  const closeEditModal = () => {
    setShowEditModal(false)
    setProductId("")
    setProductName('')
    setProductDate("")
    setProductDec("")
    setProductLand("")
    setNameLand("")
    setDefaultProduct("")
    setDefaultLand("")
    setEdit(false)
  }

  useEffect(() => {
    if (productLand) {
      const landName = lands.find(land => land.uuid === productLand);
      setNameLand(landName ? landName.title : "");
    }
  }, [productLand])

  return (
    <>
      {
        landInfo && lands ? (
          <>
            <Modal show={showRemoveProductModal} onHide={handleCloseRemoveProductModal}>
              <Modal.Header closeButton>
                <Modal.Title className='notif-modal'>Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure about deletion ?</Modal.Body>
              <Modal.Footer>
                <Button style={{ width: "100px", border: "none" }} variant="secondary" onClick={handleCloseRemoveProductModal}>
                  No
                </Button>
                <Button style={{ backgroundColor: "#5DA25E", width: "100px", border: "none" }} variant="primary" onClick={handleSaveChange}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>

            {showEditModal && productName && nameLand &&
              <div className={`modal-edit-container`}>
                <div className="modal-edit-form" >
                  <div className="product-input-wrapper">
                    <label className="label-edit" htmlFor="">
                      choose your product
                    </label>
                    <select
                      disabled={!edit}
                      className="selectproduct product-drop bg-success text-light"
                      value={productId}
                      onChange={handleProductChange}
                      style={edit ? {} : { opacity: 0.5, cursor: 'not-allowed' }}
                    >
                      {defaultproduct ? (
                        <>
                          {defaultproduct.map(product => (
                            <option value={product.id}>{product.name}</option>
                          ))}
                        </>) : (
                        <>
                          {<option value={productId}>{productName}</option>}
                        </>)}

                    </select>
                  </div>
                  <div className="product-input-wrapper">
                    <label className="label-edit" htmlFor="">
                      choose your land
                    </label>
                    <select
                      disabled={!edit}
                      className="selectproduct land-drop bg-success text-light"
                      value={productLand}
                      onChange={(e) => setProductLand(e.target.value)}
                      style={edit ? {} : { opacity: 0.5, cursor: 'not-allowed' }}
                    >
                      {defaultLand ? (
                        <>
                          {defaultLand.map(land => (
                            <option value={land.uuid}>{land.title}</option>
                          ))}
                        </>) : (
                        <>

                          <option value={productLand}>{nameLand ? nameLand.title : ''}</option>

                        </>)}

                    </select>
                  </div>
                  <div className="product-input-wrapper">
                    <label className="label-edit" htmlFor="">
                      date
                    </label>
                    <input
                      disabled={!edit}
                      value={productDate}
                      onChange={(e) => e.target.value}
                      className="product-date-input"
                      style={edit ? {} : { opacity: 0.5, cursor: 'not-allowed' }}
                      type="date" />
                  </div>
                  <div className="product-input-wrapper">
                    <label className="label-edit" htmlFor="">
                      description
                    </label>
                    <textarea
                      disabled={!edit}
                      style={{ borderColor: "#198754" }}
                      value={productDec}
                      onChange={(e) => setProductDec(e.target.value)}
                      className="product-description"
    
                    >

                    </textarea>
                  </div>
                  <div className="edit-product-btns">
                    <button className="product-btn edit-btn-product bg-success text-light"
                      onClick={() => {
                        if (edit) {
                          sendEditProduct();
                          setEdit(false)
                        } else {
                          getDefaultInfo();
                          setEdit(true);
                        }
                      }}
                    >
                      {edit ? 'Save' : 'Edit'}
                    </button>
                    <button
                      onClick={closeEditModal}
                      className="product-btn cancel-btn-product"
                    >
                      cancel
                    </button>
                  </div>
                </div>

              </div>
            }
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
                    <TabbedLand
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
                        <></>
                      )}
                    </TabbedLand>
                  </Container>
                )}
              </div>
            </div>

          </>) :
          (
            <>
              <div className="d-flex">
                <div className="d-none d-lg-block">
                  <NavBar />
                </div>
                <div className="w-100 ">
                  <Header></Header>
                  <ToastContainer />
                  <Container className="w-100">
                    <TabbedLand
                      lands={lands}
                      setActiveTab={onClickToggleActive}
                      activeTab={activeTab}
                      onAddLand={handleAddLand}
                      onEditLand={handleEditLand}
                      onDeleteLand={handleRemoveLand}
                    >
                    </TabbedLand>
                  </Container>
                  <Container>
                    <>
                      <div style={{ width: "270px", height: "270px", margin: "30px auto" }} className='empty-container'>
                        <div style={{ width: "250px", height: "250px" }} className='bg-empty-p'>
                          <img style={{ width: "100%", height: "100%" }} src="src/Images/homePage/empty-box (1).png" alt="" />
                        </div>
                        <h5 className='text-muted mt-3 text-center'>There is no Land to display Go To AddLand</h5>
                      </div>
                    </>
                  </Container>
                </div>
              </div>
            </>
          )
      }
    </>
  );
}
function Predictions({ temp, activeJob, soliwind }) {
  return (
    <Row className="overflow-y-scroll px-3 px-sm-2 px-lg-1 px-md-0 predictions-height mb-3">
      <Col xs={12} lg={6} className="px-0 px-lg-4">
        <PlanInfo
          pClassName="w-100 mb-3 rounded-3"
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
          pClassName="w-100 mb-3 rounded-3"
          className="s12"
          quality="high"
          amount={activeJob ? activeJob : "0"}
          title="Jobs Active"
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
          pClassName="w-100 mb-3 rounded-3 "
          className="s14"
          quality="low"
          amount={soliwind && soliwind.soil_moisture_data ? soliwind.soil_moisture_data.value : ""}
          title="Wind Speed"
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
    <div className="rounded-3 shadow p-3 mb-2">
      <div className="header-products border-primary2-bottom">
        <h4 className="text-prim2">Products</h4>
        <div className="add-product" onClick={onAddProduct}>
          <i className="bi bi-plus-square fs-4 ms-1" style={{ color: "#198754" }}></i>
        </div>
      </div>
      <div className="product-content">
        <ul className="overflow-y-scroll list-unstyled product-height">

          <>
            {products ? (
              <>
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
              </>) :
              (
                <>
                  <p>there is not products to be shown</p>
                </>
              )}
          </>
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
      className={`${productInfo.uuid === selectedProduct.uuid ? `activeProduct` : ``
        }`}
    >
      <span onClick={() => onProduct(productInfo.uuid)}>
        {productInfo.name}
      </span>
      <div className="edit_remove">
        <i
          className="bi bi-pencil-square fs-5 me-3 text-warning"
          onClick={() => onEdit(productInfo.uuid)}
        ></i>
        <i
          className="bi bi-trash3 fs-5 text-danger"
          onClick={() => onRemove(productInfo.uuid)}
        ></i>
      </div>
    </li>
  );
}

function SelectedProduct({ productInfo, tasks, imgProduct }) {
  return (
    <div className="productcardnew rounded-3">
      <Col
        xs={12}
        lg={2}
        className="d-none d-lg-flex justify-content-center align-items-center"
      >
        <img src={plantImage} alt="test" className="img-fluid" />
      </Col>
      <Col xs={12} lg={5} className="h-100 mb-2 mb-lg-0">
        <div style={{ borderRadius: "8px" }} className="details_card h-100  mx-0 mx-md-2 mx-lg-3 mx-xl-4 mx-xxl-5">
          <Row className="flex-row details-height">
            <Col xs={6} className="flex-custome">
              <img src={imgProduct ? `${IP}${imgProduct}` : "src/Images/product/wheat.svg"} className="product-img" alt="product" />
            </Col>
            <Col
              xs={6}
              className="d-flex align-items-start justify-content-center flex-column"
            >
              {productInfo && productInfo.product_info && (
                <>
                  <div className="product_info">
                    <span>Crop:</span>
                    <span>{productInfo.product_info.name}</span>
                  </div>
                  <div className="product_info">
                    <span>Percentage:</span>
                    <span>{productInfo.percentage + "%"}</span>
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
        <div style={{ borderRadius: "8px" }} className="details_card h-100  mx-0 mx-md-2 mx-lg-3 mx-xl-4 mx-xxl-5">
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
  }, [task.start_date]);

  return (
    <div style={{ textAlign: "center" }} className="weeks_card">
      <div className="text_muted">{month}</div>
      <div className={ task.status==="P" ?"pending":"approved" }>
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
  { uuid: 1, color: "#5DA25E", text: "approved" },
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


