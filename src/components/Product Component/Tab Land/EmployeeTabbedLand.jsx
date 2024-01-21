import React from 'react'

export default function EmployeeTabbedLand({
    children,
    activeTab,
    setActiveTab,
    lands,
    onAddLand,
    onEditLand,
    onDeleteLand, }) {
    return (

        <>
            {
                lands.length > 0 ? (
                    <div className="w-100  mt-3 ">
                        <div className="tabbs top_land">
                            <select className="product-lands-drow bg-success text-light"
                                onChange={(e) => setActiveTab(e.target.value)}
                                value={activeTab}
                                style={{ width: "155px", padding: "7px" }}
                            >
                                {lands.map((land, i) => (
                                    <option style={{ backgroundColor: "#fff", color: "#198754" }} key={i} value={land.uuid}>{land.title}</option>
                                ))}
                            </select>
                            <div>
                            </div>
                        </div>

                        {children}
                    </div>

                ) : (
                    <>
                        <div style={{ width: "270px", height: "270px",margin:"30px auto" }} className='empty-container'>
                            <div style={{ width: "250px", height: "250px" }} className='bg-empty-p'>
                                <img style={{ width: "100%", height: "100%" }} src="src/Images/homePage/empty-box (1).png" alt="" />
                            </div>
                            <h5 className='text-muted mt-3'>There is no Land to display</h5>
                        </div>
                    </>

                )
            }
        </>


    )
}
