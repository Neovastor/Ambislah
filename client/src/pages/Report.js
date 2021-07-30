import React, { useState } from 'react'
import { useQuery, useReactiveVar, useMutation } from '@apollo/client'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal'
import { modalVar } from '../graphql/vars'
import {DELETE_REPORT, GET_ALL_REPORTS} from '../graphql/queiries'
import Swal from 'sweetalert2'

export default function Report() {
    const {loading, error, data: dataReports} = useQuery(GET_ALL_REPORTS, {
        variables: {
            access_token: localStorage.access_token
        }
    })
    const [deleteReport] = useMutation(DELETE_REPORT)
    const openModal = useReactiveVar(modalVar)
    const showModal = () => {
        modalVar(true)
    }
    const destroy = async (id) => {
      try {
        console.log('destroy data');
        await deleteReport({
          variables: {
            idReport: id,
            access_token: localStorage.access_token
          },
        })
        Swal.fire({
          icon: "success",
          title: "Success delete report",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "your input not valid",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }

    return (
        <>
        {/* {
            JSON.stringify(dataReports)

        } */}
        {
            !dataReports.getReportsAll.length 
            ? <div>
                <button className="bg-yellow-500 rounded-full px-6 py-4 hover:bg-yellow-700 text-lg text-white font-bold">
                  There is no reports
                </button>
            </div>
            :
            (<div className="bg-[#27659e] h-screen mmd:h-full flex flex-auto justify-center items-end">
                <div className="bg-[#429dda] h-[80%] w-[90%] mmd:pt-8 flex justify-center font-sans overflow-hidden">
                    <div className="w-full lg:w-5/6 pt-5">
                        {/* <div className="grid grid-cols-8 text-gray-600">
                        <input placeholder="Search" className="col-span-7 bg-white h-10 px-5 pr-10 rounded-l-full text-sm focus:outline-none w-full" />
                        <button className="bg-white rounded-r-full">
                            <FontAwesomeIcon className="hover:text-green-500" icon={faSearch} />
                        </button>
                    </div> */}
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Title</th>
                                        {/* <th className="py-3 px-6 text-left">Status</th> */}
                                        <th className="py-3 px-6 text-left">Date</th>
                                        {/* <th className="py-3 px-6 text-center">Game Mode</th> */}
                                        <th className="py-3 px-6 text-center">Total Players</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    { dataReports.getReportsAll.map((report,i) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <span>{report.quizTitle}</span>
                                            </div>
                                        </td>
                                        {/* <td className="py-3 px-6 text-center">
                                        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Finish</span>
                                    </td> */}
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="font-medium">{report.createdAt}</span>
                                            </div>
                                        </td>

                                        {/* <td className="py-3 px-6 text-center">
                                        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Live</span>
                                    </td> */}
                                        <td className="py-3 px-6 text-center">
                                            <span className=" py-1 px-3 rounded-full text-xs">{report.playersCount}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                <div onClick={showModal} className="w-4 mr-2 cursor-pointer hover:text-yellow-600 hover:scale-110">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </div>
                                                <div onClick={destroy(report._id)} className="w-4 mr-2 cursor-pointer hover:text-yellow-600 hover:scale-110">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                    </tr> ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            )}
            {
                openModal ? <Modal /> : <></>
            }
        
        </>
    )
}