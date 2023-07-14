import { FaCog } from 'react-icons/fa';

const MedicalServices = () => {
    return (
        <>
            <div className="absolute top-0 right-0">
                <button className="m-2 bg-teal-500 text-sm text-white px-2 py-1">Add new Medical Service</button>
            </div>
            <div className="grid gap-4 grid-cols-3">
                <div className="card max-w-xs px-8 py-4 mx-auto bg-teal-400 rounded-lg shadow-md dark:bg-gray-800" style={{ cursor: "auto" }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">2 Workers</a>
                            <a className="px-3 py-1 mx-3 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">RSHMK</a>
                        </div>
                        <FaCog className="text-gray-100 cursor-pointer hover:text-gray-500 text-2xl" />
                    </div>
                    <div className="mt-2">
                        <a href="https://stackdiary.com/" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">Rumah Sakit Hermina Kalibata</a>
                    </div>
                </div>

                <div className="card max-w-xs px-8 py-4 mx-auto bg-teal-400 rounded-lg shadow-md dark:bg-gray-800" style={{ cursor: "auto" }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">No Workers</a>
                            <a className="px-3 py-1 mx-3 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">RSHKJ</a>
                        </div>
                        <FaCog className="text-gray-100 cursor-pointer hover:text-gray-500 text-2xl" />
                    </div>
                    <div className="mt-2">
                        <a href="https://stackdiary.com/" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">Rumah Sakit Hermina Kebon Jeruk</a>
                    </div>
                </div>

                <div className="card max-w-xs px-8 py-4 mx-auto bg-teal-400 rounded-lg shadow-md dark:bg-gray-800" style={{ cursor: "auto" }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">2 Workers</a>
                            <a className="px-3 py-1 mx-3 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">RSHB</a>
                        </div>
                        <FaCog className="text-gray-100 cursor-pointer hover:text-gray-500 text-2xl" />
                    </div>
                    <div className="mt-2">
                        <a href="https://stackdiary.com/" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">Rumah Sakit Hermina Bekasi</a>
                    </div>
                </div>


                <div className="card max-w-xs px-8 py-4 mx-auto bg-teal-400 rounded-lg shadow-md dark:bg-gray-800" style={{ cursor: "auto" }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">4 Workers</a>
                            <a className="px-3 py-1 mx-3 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">RSHBL</a>
                        </div>
                        <FaCog className="text-gray-100 cursor-pointer hover:text-gray-500 text-2xl" />
                    </div>
                    <div className="mt-2">
                        <a href="https://stackdiary.com/" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">Rumah Sakit Hermina Tangerang</a>
                    </div>
                </div>


            </div>
        </>
    )
}

export default MedicalServices;
