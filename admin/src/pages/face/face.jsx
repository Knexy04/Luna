import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import "./components.scss";
import { NavLink } from "react-router-dom";
import Icon from '@mdi/react';
import { mdilArrowRight } from '@mdi/light-js';

const Face = () => {
    const [face, setFace] = useState({});
    const [facesCategory, setFacesCategory] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('')

    useEffect(() => {
        axios.get('/getfacecollection')
            .then((res) => {
                setFace(res.data[0]);
                setSelectedFile(res.data[0].photo)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get('/facescategory')
            .then((res) => {
                setFacesCategory(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('images', file);
    
            axios.post('/upload', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                const uploadedFileName = res.data[0]; // Assuming it returns an array with one filename
                setFileName(uploadedFileName); // Update fileName state
    
                axios.patch(`/collection/${face._id}`, {
                    fileName: uploadedFileName, // Use updated fileName here
                    name: face.name,
                    disabled: face.disabled
                })
                .then((res) => {
                    setFace(res.data);
                    setSelectedFile(uploadedFileName)
                })
                .catch((err) => {
                    console.log(err);
                });
            })
            .catch((err) => {
                console.log(err)
            });
        }
    };
    

    return (
        <div className="px-[16px] xl:px-[140px]">
            <div className="mt-16 font-bold text-3xl mb-8">{face.name}</div>
            <div>
                <label htmlFor="fileInput" className="w-max">
                    <img
                        src={import.meta.env.VITE_HOST + selectedFile}
                        alt="face"
                        style={{ width: "300px", cursor: "pointer" }}
                    />
                </label>
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>

            <div>
                <div className="mt-16 font-bold text-3xl">Категории лица:</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
                    {facesCategory.map((item) => (
                        <div key={item._id} className="mb-12">
                            <div className="z-15">
                                <img
                                    className="divCard object-cover"
                                    src={import.meta.env.VITE_HOST + item.photo}
                                    height={1920}
                                    width={1080}
                                    alt=""
                                />
                            </div>
                            <div className="flex justify-center h-10 -mt-6">
                                <NavLink
                                    className="buttonrow w-11/12 z-20 transition-all hover:bg-slate-900 hover:bg-opacity-10 flex justify-between px-3 leading-9 items-center"
                                    to={`/face/${item._id}`}
                                >
                                    <div className="text-[12px] lg:text-[18px] overflow-hidden text-ellipsis whitespace-nowrap">
                                        {item.name}
                                    </div>
                                    <div>
                                        <Icon path={mdilArrowRight} size={1} />
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Face;
