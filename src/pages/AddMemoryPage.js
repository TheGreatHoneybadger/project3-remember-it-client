import { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown"
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddMemory(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = { title, description, category };
        axios
            .post(`${API_URL}/memory`, requestBody)
            .then((response) => {
                navigate("/memory")
                //props.refreshMemory(); ---> später löschen? 
            })
            .catch((error) => console.log(error));
    };
    const [mapCategory, setMapCategory] = useState([]);

    const getAllCategories = () => {
        axios
            .get(`${API_URL}/memory`)
            .then((response) => {
                const wholeArray = response.data
                const onlyCategories = wholeArray.map(singleCategory => singleCategory.category)
                const uniqueCategories = [...new Set(onlyCategories)]
                setMapCategory(uniqueCategories)})
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllCategories();
    }, [ ]);

    return (
        <div>
            <h3>Add new stuff to your memory</h3>

            <form onSubmit={handleSubmit}>
                <label>title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />

                <label>description</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                 <label>category</label> 
                <p>{category}</p>

                <Dropdown autoClose="outside">
                    <Dropdown.Toggle className="menuIcon">
                        category
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>                
                            <input
                                // fct to be able to press spacebar in input field
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) =>
                                    e.keyCode === 32 ? e.stopPropagation() : null
                                }
                            type="text"
                            name="category"
                            value={category}
                            onChange={ (e) => setCategory(e.target.value)}
                            />
                        </Dropdown.Item>
                {mapCategory.map((oneCategory) => {
                    return (
                        <Dropdown.Item>
                            <div key={oneCategory._id}>
                                <p onClick={(e) => setCategory(e.target.innerText)}>{oneCategory}</p>
                            </div>
                        </Dropdown.Item>
                    )
                })}       
                    </Dropdown.Menu>
                </Dropdown>
 
                <button type="submit">Add this stuff!</button>
            </form>
        </div>
    )
}

export default AddMemory;