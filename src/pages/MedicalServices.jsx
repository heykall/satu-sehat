import { FaCog } from 'react-icons/fa';
import UseApiCall from "../utils/UseApiCall";
import Loading from "../components/Loading";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from 'react';


const MedicalServices = () => {
    const navigate = useNavigate();
    const { isLoading, data, error, fetchData } = UseApiCall();
    const [healthServices, setHealthService] = useState(null)

    useEffect(() => {
        fetchData(
            import.meta.env.VITE_BASE_URL + "/healthcare",
            "get",
            null,
            {
                access_token: JSON.parse(localStorage.getItem('user-token'))
            }
          ).then(({data}) => {
            setHealthService(data)
          })
          .catch((e) => {
            console.log(e)
          })
    }, [])

    useEffect(() => {
        console.log(data)
    },[data])

    return (
        <>
            <div className="absolute top-0 right-0">
                    <button onClick={() => navigate('/create-healthservice')} className="m-2 bg-teal-500 text-sm text-white px-2 py-1">Add new Medical Service</button>
            </div>
            
                
                
                <div className="grid gap-4 grid-cols-3 ">
                    {
                    healthServices ? healthServices.map(healthCare => (
                        <div key={healthCare._id} className="card max-w-xs min-w-full  px-8 py-4 mx-auto bg-teal-400 rounded-lg shadow-md dark:bg-gray-800" style={{ cursor: "auto" }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {/* <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">2 Workers</a> */}
                            <button className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">{healthCare.alias}</button>
                        </div>
                        <FaCog className="text-gray-100 cursor-pointer hover:text-gray-500 text-2xl" />
                    </div>
                    <div className="mt-2">
                        <Link to={'/dashboard-worker/' + healthCare._id}>
                            <span className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{healthCare.healthcare_name}</span>
                        </Link>
                    </div>
                </div>
                    ))
                    
                    : <div className="grid gap-0 grid-cols-1 ">
                        <h2 className='text-2xl'>No Health services, please create it first</h2>
                        </div>
                }            
            </div>
            
        </>
    )
}

export default MedicalServices;
