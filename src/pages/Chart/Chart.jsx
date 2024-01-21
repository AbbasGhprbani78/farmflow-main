
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Row, Col } from 'react-bootstrap';
import './Chart.css'
import { IP } from '../../App';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../../components/Laoding/Loading';
import Table from 'react-bootstrap/Table';
ChartJS.register(ArcElement, Tooltip, Legend);



export default function Chart() {
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.5,
        height: 200,
        width: 200,
    };

    const [data, setData] = useState()
    const [data2, setData2] = useState()
    const getChartValues = async () => {

        const access = localStorage.getItem('access')
        const headers = {
            Authorization: `Bearer ${access}`
        };

        try {
            const response = await axios.get(`${IP}/get-report/`, {
                headers,
            })

            if (response.status === 200) {
                console.log(response)
                setData(response.data.tools_name_count)
                setData2(response.data.status_count)
                console.log(data)
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
        getChartValues()
    }, [])

    const transformedData = data
        ? {
            labels: data.map(item => item.name),
            datasets: [
                {
                    label: '#count',
                    data: data.map(item => item.count),
                    backgroundColor: [
                        ' #14B8A6',
                        '#3B82F6',
                        ' #6366F1',
                        ' #F59E0B',
                        ' #FACC15',
                        '#392467',
                        "#52D3D8",
                        "#E26EE5",
                        "#092635",
                        "#7D0A0A",
                        "#DA0C81",
                        "#9EDDFF",
                        "#9400FF"

                    ],
                    borderColor: [
                        '#14B8A6',
                        '#3B82F6',
                        '#6366F1',
                        '#F59E0B',
                        '#FACC15',
                        '#392467',
                        "#52D3D8",
                        "#E26EE5",
                        "#092635",
                        "#7D0A0A",
                        "#DA0C81",
                        "#9EDDFF",
                        "#9400FF"

                    ],
                    borderWidth: 1,
                },
            ],
        }
        : null;

    const dataDoughnut = data2
        ? {

            labels: data2.map(item => item.status),
            datasets: [
                {
                    label: '# value',
                    data: data2.map(item => item.count),
                    backgroundColor: [
                        '#FACC15',
                        "#f59e0b",
                        '#14B8A6',
                        '#392467',
                        '#FACC15',
                        '#392467',
                        "#52D3D8",
                        "#E26EE5",
                        "#092635",
                        "#7D0A0A",
                        "#DA0C81",
                        "#9EDDFF",
                        "#9400FF"
                    ],
                    borderColor: [
                        '#FACC15',
                        "#f59e0b",
                        '#14B8A6',
                        '#392467',
                        '#FACC15',
                        '#392467',
                        "#52D3D8",
                        "#E26EE5",
                        "#092635",
                        "#7D0A0A",
                        "#DA0C81",
                        "#9EDDFF",
                        "#9400FF"
                    ],
                    borderWidth: 1,
                },
            ],
        } :
        null;

    return (
        <>
            {transformedData && dataDoughnut ? (
                <>
                    <Row className='chart-container  justify-content-center mt-5'>
                        <Col style={{ padding: "0px 20px" }} xs={12} md={6} className='d-flex flex-column'>
                            <p className="mb-2" style={{ textAlign: "center", fontWeight: "bold" }}>Equipment Status Tracking</p>
                            <Col xs={12} >
                                <Doughnut style={{ height: "250px" }}
                                    data={dataDoughnut}
                                    options={options}
                                />
                            </Col>
                            <div className='table-chart-container'>
                                <Table style={{ maxWidth: "500px", margin: "0 auto" }} className='table-chart mt-5 text-left '>
                                    <thead>
                                        <tr>
                                            <th>Lable</th>
                                            <th>Value</th>
                                            <th style={{textAlign:"center"}}>%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data2.map((data, i) => (
                                            <tr className='tr-chart' key={i}>
                                                <td>{data.status == "IU" ? "under maintenance" : data.status == "A" ? "available" : "In Use"}</td>
                                                <td >{data.count}</td>
                                                <td style={{textAlign:"center"}} >{(data.percentage).toFixed(2).replace(/\.?0*$/, '')}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>


                        <Col style={{ padding: "0px 20px" }} xs={12} md={6} className='d-flex flex-column  text-left'>
                            <p className="equ-ch" style={{ textAlign: "center", fontWeight: "bold" }}>Equipments</p>
                            <Col xs={12}>
                                <Pie
                                    style={{ height: "250px", }}
                                    data={transformedData}
                                    options={options}
                                />
                            </Col>
                            <div className="table-chart-container">
                                <Table style={{ maxWidth: "500px", margin: "0 auto" }} className='mt-5 table-chart text-left' hover>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((data, i) => (
                                            <tr key={i}>
                                                <td>{data.name}</td>
                                                <td>{data.count}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </>
            ) : (
                <>
                    <Loading />
                </>
            )}
        </>
    );
}
