import { base_url, messages_url, enquires_url } from "../../constants/api";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

// Messages are currently public! Need fix.

export default function Enquires() {
    const [enquires, setEnquires] = useState([]);

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await axios.get(enquires_url);

                console.log(response.data);

                setEnquires(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                console.log("finally");
            }
        }
        fetchData();
    }, []);

    return (
        <div className="enquires-container">
            <h2>Enquires</h2>
            {enquires.map(function (enquire) {
                return (
                    <div key={enquire.id} className="enquires">
                        <div className="enquire">
                            <p className="enquire-name">{enquire.Name}</p>
                            <p className="enquire-email">{enquire.Email}</p>
                            <p className="enquire-date">
                                {moment(enquire.created_at).format(
                                    "DD MMMM YYYY"
                                )}
                            </p>
                            <div className="enquire-information">
                                <p className="enquire-place">
                                    Place: {enquire.Place}
                                </p>
                                <p className="enquire-guests">
                                    Guests: {enquire.Guests}
                                </p>
                                <p className="enquire-checkin">
                                    Checkin:{" "}
                                    {moment(enquire.Checkin).format(
                                        "DD MMMM YYYY"
                                    )}
                                </p>
                                <p className="enquire-checkin">
                                    Checkout:{" "}
                                    {moment(enquire.Checkout).format(
                                        "DD MMMM YYYY"
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
