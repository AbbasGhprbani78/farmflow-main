import { useId, useState, useEffect } from "react";
import axios from "axios";
import { IP } from "../App";


function PlansForm(props) {

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null)
  const selectId = useId();

  const getLands = async () => {
    const access = localStorage.getItem('access')
    const headers = {
      Authorization: `Bearer ${access}`
    };

    try {
      const response = await axios.get(`${IP}/manager-land-count/`, {
        headers,
      })

      if (response.status === 200) {
        console.log(response)
        setPlans(response.data.manager_lands)

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
    getLands()
  }, [])


  const getWeather = (selectedPlanUuid) => {
    if (selectedPlanUuid) {
      console.log(`Getting weather for plan: ${selectedPlanUuid}`);
      props.getWeather(selectedPlanUuid);
    }
  }

  useEffect(() => {
    if (plans.length > 0) {
      const firstPlanUuid = plans[0].uuid;
      setSelectedPlan(firstPlanUuid);
      getWeather(firstPlanUuid);
    }
  }, [plans]);


  return (
    <div>
      <form className="palnForm">
        <label htmlFor={selectId} className="fs-5">
          Plan
        </label>
        <div className="test position-relative w-75">
          <select
            value={selectedPlan}
            onChange={(e) => {
              const selectedValue = e.target.value;
              setSelectedPlan(selectedValue);
              getWeather(selectedValue);
            }}
            id={selectId}
            className=" py-1 w-100"
          >
            {plans &&
              plans.map(plan => (
                <option key={plan.uuid} value={plan.uuid}>{plan.title}</option>
              ))
            }
          </select>
        </div>
      </form>
    </div>
  );
}
export default PlansForm;


