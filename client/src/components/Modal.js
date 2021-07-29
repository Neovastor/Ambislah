import React from 'react'
import { modalVar } from '../graphql/vars';

export default function Modal() {

    const back = () => {
        modalVar(false)
    }

    return (
        <div className="bg-gray-500 h-full w-screen sm:px-8 md:px-16 sm:py-8">
            <main className="container mx-auto max-w-screen-lg h-full">
                {/* file upload modal */}
                <div className="flex justify-end my-4">
                    <button onClick={back} className="rounded-lg bg-[#000000] font-bold uppercase bg-[#15883E] hover:border-2 text-white hover:border-[#000000] hover:bg-[#000000] hover:text-[#fffff] text-white rounded-lg mr-2 px-8 py-2">back</button>
                </div>
                <article className="h-full flex flex-col bg-white shadow-xl rounded-md" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);" ondragleave="dragLeaveHandler(event);" ondragenter="dragEnterHandler(event);">
                    {/* Player */}
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Nickname</th>
                                <th className="py-3 px-6 text-left">Score</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>Eshal Rosas</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">100</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </article>
            </main>
        </div>
    )
}