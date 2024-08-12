import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "../../../axios.js";
import { mdiCloseOutline } from '@mdi/js';
import Icon from '@mdi/react';


const FaceCategory = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`/facescategory/${id}`)
            .then((res) => {
                setName(res.data.name);
                setDisabled(res.data.disabled);
                setItems(res.data.items);
                setSelectedFile(res.data.photo);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

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
                    axios.patch(`/facescategory`, {
                        photo: uploadedFileName,
                        _id: id
                    })
                        .then((res) => {
                            setSelectedFile(uploadedFileName);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleSubmit = () => {
        axios.patch(`/facescategory`, {
            name: name,
            disabled: disabled, // Передаем значение disabled в запросе
            items: items,
            _id: id
        })
            .then((res) => {
                // Переход на страницу face с id
                window.location.href = `/face/${id}`;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCheckboxChange = (e) => {
        setDisabled(e.target.checked); // Обновляем состояние disabled при изменении чекбокса
    };

    const handleDeleteItem = (id) => {
        setItems([...items].filter(el => el._id !== id))
    }

    return (
        <div className="px-12">
            <div className="border shadow rounded-xl p-4 mb-6 text-2xl">
                <div className="flex gap-8 items-center justify-center">
                    <div className="mt-[-8px] font-bold">Название: </div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="text-xl font-bold mb-2" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="font-bold">Скрыто:</div>
                    <input type="checkbox" id="disabledCheckbox" checked={disabled} onChange={handleCheckboxChange} style={{width: "100px", height:"14px"}} />
                </div>
                <label htmlFor="photo11" className="flex cursor-pointer w-max items-center gap-2 mt-2">
                    <img className="h-52 w-auto object-cover rounded-md" src={import.meta.env.VITE_HOST + selectedFile} alt={`Photo`} />
                </label>
                <input id="photo11" name="photo11" style={{ display: "none" }}
                    type="file"
                    onChange={handleFileChange} />

                <div><div className="font-bold">Товары в этой подборке:</div><div className="mb-2">{items.map((item) => (<div className="flex items-center gap-2 !underline text-red-500" key={item._id}><NavLink to={`/item/${item._id}`}>{item.name} </NavLink><div className="cursor-pointer" onClick={() => handleDeleteItem(item._id)}><Icon path={mdiCloseOutline} size={1} /></div><div></div></div>))}</div></div>
                <div className="buttonrow !w-max !p-2 !text-lg cursor-pointer" onClick={handleSubmit}>Сохранить</div>
            </div>
        </div>
    );
};

export default FaceCategory;
