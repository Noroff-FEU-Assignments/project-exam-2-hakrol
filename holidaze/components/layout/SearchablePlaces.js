import { base_url, places_url } from "../../constants/api";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useState, useEffect  } from "react";
import Button from "react-bootstrap/Button";
import Link from 'next/link';
import { InputGroup } from "react-bootstrap";

export default function searchablePlaces() {

    const [places, setPlaces] = useState([]);
    const [placesToRender, setPlacesToRender] = useState([]);
    const [inputValue, setInputValue] = useState([]);
    const [suggestedPlaces, setSuggestedPlaces] = useState([]);


    useEffect(function () {
        async function fetchData() {
            try {
                const response = await axios.get(places_url);

                console.log(response.data);

                setPlaces(response.data);
                setPlacesToRender(response.data);
            } catch(error) {
                console.log(error);
            } finally {
                console.log("finally");
            }
        }
        fetchData();
    }, []);

    // handle click on suggestions from searchbar
    const handleClick = (event) => {
        const userSearch = event.target.innerHTML;
        const searchfield = document.querySelector(".searchbar");

        searchfield.value = userSearch;

        const filteredPlaces = places.filter(function (place) {
            if (place.title === userSearch) {
                return true;
            }
        });

        setPlacesToRender(filteredPlaces);

    }

    // Dsiplay places on enter in searchbar
    const onKeyPress = (key) => {
        const keyValue = key.key;

        console.log(keyValue);
        const searchValue = key.target.value.trim().toLowerCase();

        if (keyValue == "Enter") {
            const filteredPlaces = places.filter(function (place) {
                if (place.title.toLowerCase().startsWith(searchValue)) {
                    return true;
                }
            });

            setPlacesToRender(filteredPlaces);

        } else {
            console.log("nothing happens")
        }
    }

    //Reset places if searchbar is empty
    const onChange = (query) => {
        const searchValue = query.target.value.trim().toLowerCase();

        if (!searchValue) {
            console.log("Searchfield is empty")
            setSuggestedPlaces([]);
            setPlacesToRender(places)
        } else {
            const suggestedPlaces = places.filter(function (place) {
                if (place.title.toLowerCase().startsWith(searchValue)) {
                    return true;
                }
            });
            setSuggestedPlaces(suggestedPlaces);
        }
    }


    return (
        <>
                <InputGroup className="search">
                    <Form.Control 
                    className="searchbar" 
                    type="text" 
                    placeholder="Search.." 
                    onKeyPress={(key) => {onKeyPress(key)}} 
                    onChange={(query) => {onChange(query)}}
                    />
                </InputGroup>
                <div className="search-suggestion-container">
                    {suggestedPlaces.map(function (place) {
                        return <div className="search-suggestions" key={place.id}>
                                    <a size="sm" className="search-suggestion" onClick={handleClick}>{place.title}</a>
                                </div>;
                    })}
                </div>
            <div className="list">
                {placesToRender.map(function (place) {
                    // console.log(place.image[0].url)
                    return <div key={place.id} className="list_card">
                                    {/* <img src={base_url + place.image[0].url} width="300" height="200"></img> */}
                                    <img src="/assets/fillerImage.jpg" width="300" height="200"></img>
                                    <h4>{place.title}</h4>
                                    <Link href={`places/${place.id}`}><Button variant="primary">Click</Button></Link>

                            </div>;
                })}
            </div>
        </>
    )
}