import { places_url } from "../../constants/api";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import TextTrim from "react-text-trim";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function searchablePlaces() {
    const [places, setPlaces] = useState([]);
    const [placesToRender, setPlacesToRender] = useState([]);
    const [suggestedPlaces, setSuggestedPlaces] = useState([]);

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await axios.get(places_url);

                setPlaces(response.data);
                setPlacesToRender(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                console.log("finally");
            }
        }
        fetchData();
    }, []);

    // When user click on a suggestion
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
    };

    // When user press "enter" during search
    const onKeyPress = (key) => {
        const keyValue = key.key;

        const searchValue = key.target.value.trim().toLowerCase();

        if (keyValue == "Enter") {
            const filteredPlaces = places.filter(function (place) {
                if (place.title.toLowerCase().startsWith(searchValue)) {
                    return true;
                }
            });

            setPlacesToRender(filteredPlaces);
        } else {
            console.log("nothing happens");
        }
    };

    //Reset places if searchbar is empty
    const onChange = (query) => {
        const searchValue = query.target.value.trim().toLowerCase();

        if (!searchValue) {
            console.log("Searchfield is empty");
            setSuggestedPlaces([]);
            setPlacesToRender(places);
        } else {
            const suggestedPlaces = places.filter(function (place) {
                if (place.title.toLowerCase().startsWith(searchValue)) {
                    return true;
                }
            });
            setSuggestedPlaces(suggestedPlaces);
        }
    };

    return (
        <>
            {/* Searchbar */}
            <InputGroup className="search">
                <Form.Control
                    className="searchbar"
                    type="text"
                    placeholder="Search.."
                    onKeyPress={(key) => {
                        onKeyPress(key);
                    }}
                    onChange={(query) => {
                        onChange(query);
                    }}
                />
            </InputGroup>

            {/* Search suggestions */}
            <div className="search-suggestion-container">
                {suggestedPlaces.map(function (place) {
                    return (
                        <div className="search-suggestions" key={place.id}>
                            <a
                                size="sm"
                                className="search-suggestion"
                                onClick={handleClick}
                            >
                                {place.title}
                            </a>
                        </div>
                    );
                })}
            </div>

            {/* List of all places */}
            <div className="list">
                {placesToRender.map(function (place) {
                    return (
                        <div key={place.id} className="list__card">
                            <img
                                src={place.image[0].url}
                                width="300"
                                height="200"
                            />
                            <div className="list__card-information">
                                <h4>{place.title}</h4>
                                <div className="list__card-information-container">
                                    <div className="list__card-information-description">
                                        <TextTrim
                                            refId={place.id}
                                            text={place.description}
                                            showMoreLabel=""
                                            minLines={2}
                                            delimiter="..."
                                            textWrapperStyle={{}}
                                        />
                                    </div>
                                    <div className="list__card-information-details">
                                        <p className="list__card-information-price">
                                            Each night: {place.price} NOK
                                        </p>
                                    </div>
                                </div>
                                <Link href={`places/${place.id}`}>
                                    <Button variant="primary">See more</Button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
