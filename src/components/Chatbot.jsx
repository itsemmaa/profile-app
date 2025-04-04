import { useState, useEffect, useRef } from "react";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);

const chatWindowRef = useRef(null);

    //Fetch response from responses.json
    const fetchResponse = async (query) => {
        try {
            const response = await fetch(`/profile-app/responses.json`); //Fetch responses.json
            const data = await response.json();
            //search for response or return default
            for (let key in data) {
                const entry = data[key];
                if (entry.queries && entry.queries.includes(query)) {
                    return entry.response;
                }
            }
            return data.default;
        } catch(error) {
            console.error("Error fetching data:", error);
            return "Something went wrong. Please try again.";
        }
    };

    //Handle user input
    const handleSendMessage = async () => {
        if (userInput.trim() === "") return;

        //Add user message to history
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: userInput, sender: "user" },
        ]);

        setLoading(true);

        //Fetch response based on the input
        const query = userInput.toLowerCase().replace(/\s+/g, "_");
        const responseMessage = await fetchResponse(query);

    setTimeout(async () => {

        const responseMessage = await fetchResponse(query);
        //Add bot response to history
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: responseMessage, sender: "bot" },
        ]);

        setLoading(false); //Stop typing indicator
    }, 1000); //Delay for 1 second
        setUserInput(""); //Clear input field upon submission
    };

    //Answers can be submitted using enter button
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    };

    //Scroll to bottom when new messages appear
    useEffect(() => {
        console.log(messages);
        if(chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]); //Runs every time a new message appears

    return (
        <div className="chatbot">
            <div className="chat-window" ref={chatWindowRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={chatWindowRef}></div>
                {loading && <div className="loading">Typing...</div>}
            </div>
            <div className="input-section">
                <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={handleKeyPress} placeholder="Type a message..."/>
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chatbot;