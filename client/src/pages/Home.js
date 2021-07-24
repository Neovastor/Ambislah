import React from 'react'

export default function Home() {
    return (
        <>
            <div className="grid grid-cols-6 gap-2 md-max:grid-cols-3 pt-16">
                {/* <div className="flex flex-wrap justify-center md-max:flex-col md-max:items-center "> */}
                <div className="bg-red-500 box-border w-full p-4 border-4 md-max:col-span-4 grid-rows-2">
                    <div className="bg-custom_red box-border h-32 my-2 p-2">box username</div>
                    <div className="bg-yellow-700 box-border h-32 my-2 p-2">Challenge
                        Overview (Offline quiz still active)</div>
                </div>
                <div className="bg-yellow-500 box-border h-auto w-full p-4 border-4 col-span-4">
                    <div>Collection Kuis</div>
                    <div>
                        <div className="flex flex-wrap">
                            <div className="md:w-1/2 lg:w-1/3 py-4 px-4">
                                <div className=" ">
                                    <a href="#">
                                        <div className="bg-white shadow p-2 rounded-lg text-gray-800 hover:shadow-lg">
                                            <img src={"https://asset.kompas.com/crops/sn--2PkUfeAmtszsB-wnqXmwBkM=/0x0:5184x3456/750x500/data/photo/2020/12/11/5fd303549b2c9.jpg"} className="h-32 rounded-lg w-full object-cover" />
                                            <div className="py-2 px-2">
                                                <div className=" font-bold font-title text-center">Kucing Malas</div>
                                                <div className="text-sm font-light text-center my-2">Portal pecinta kucing</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="md:w-1/2 lg:w-1/3 py-4 px-4">
                                <div className=" ">
                                    <a href="#">
                                        <div className="bg-white shadow p-2 rounded-lg text-gray-800 hover:shadow-lg">
                                            <img src={"https://asset.kompas.com/crops/sn--2PkUfeAmtszsB-wnqXmwBkM=/0x0:5184x3456/750x500/data/photo/2020/12/11/5fd303549b2c9.jpg"} className="h-32 rounded-lg w-full object-cover" />
                                            <div className="py-2 px-2">
                                                <div className=" font-bold font-title text-center">Kucing Malas</div>
                                                <div className="text-sm font-light text-center my-2">Portal pecinta kucing</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="md:w-1/2 lg:w-1/3 py-4 px-4">
                                <div className=" ">
                                    <a href="#">
                                        <div className="bg-white shadow p-2 rounded-lg text-gray-800 hover:shadow-lg">
                                            <img src={"https://asset.kompas.com/crops/sn--2PkUfeAmtszsB-wnqXmwBkM=/0x0:5184x3456/750x500/data/photo/2020/12/11/5fd303549b2c9.jpg"} className="h-32 rounded-lg w-full object-cover" />
                                            <div className="py-2 px-2">
                                                <div className=" font-bold font-title text-center">Kucing Malas</div>
                                                <div className="text-sm font-light text-center my-2">Portal pecinta kucing</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-500 box-border w-full p-4 border-4 md-max:col-span-4 grid-rows-2">
                    <div className="bg-blue-200 box-border h-32 my-2 p-2">Quiz file</div>
                    <div className="bg-blue-300 box-border h-32 my-2 p-2">Report</div>
                </div>
            </div>
        </>
    )
}