import { base_url, messages_url } from "../../constants/api";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

// Messages are currently public! Need fix.

export default function Messages() {
    const [messages, setMessages] = useState([]);

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await axios.get(messages_url);

                console.log(response.data);

                setMessages(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                console.log("finally");
            }
        }
        fetchData();
    }, []);

    return (
        <div className="messages-container">
            <h2>Messages</h2>
            {messages.map(function (message) {
                return (
                    <div key={message.id} className="messages">
                        <div className="message">
                            <p className="message-name">{message.name}</p>
                            <p className="message-email">{message.email}</p>
                            <p className="message-date">
                                {moment(message.created_at).format(
                                    "DD MMMM YYYY"
                                )}
                            </p>
                            <p className="message-text">{message.Message}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
