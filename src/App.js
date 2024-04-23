import React, {useState} from "react";
import {Configuration} from "openai";
import Chat from "./Chat";
import "./App.css"
import chatClosed from './img/customer-service.svg';
import chatOpened from './img/close.svg';

function App() {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [msg, setMsg] = useState("");
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setMsg(prompt);
        setLoading(true);
        setPrompt('');

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR-OPENAI-API-KEY'
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {role: "system", content: "This bot provides information based on the content of the fidea.es website. Answer questions regarding services, products, terms of service and contact details presented strictly on the site only and answer in English. If question is not related to the topic from Fidea.es website, then ask politely to user to contact our customer service team via email support@fidea.es. In case AI want's to answer: 'information is not provided by Fidea.es or is not specified on the website', then politely offer to user to contact our customer service via email support@fidea.es"},
                        {role: "user", content: '' + prompt}
                    ],
                    temperature: 0.5,
                    max_tokens: 100,
                })
            });
            const data = await response.json();
            if (response.ok) {
                console.log(response)
                setResult(data.choices[0].message.content);
            } else {
                throw new Error(data.error ? data.error.message : "API call failed");
            }
        } catch (error) {
            console.error(error);
            setResult("Failed to fetch response, please try again.");
        }
        setLoading(false);
    };

    return (
        <>
            {open ?
                <>
                    <div className="content container">
                        <div className="row row-broken">
                            <div className="col-sm-12 col-xs-12 chat shaddowAdd">
                                <div className="col-inside-lg decor-default">
                                    <Chat result={result} prompt={msg}/>
                                </div>
                                <div className="answer-add2">
                                    <div className="row">
                                        <div className="col-sm-10">
                <textarea
                    value={prompt}
                    onChange={(e) => {
                        setPrompt(e.target.value)
                    }}
                    placeholder="Ask anything you want.."
                    className="form-control"/>
                                        </div>
                                        <div className="col-sm-2">
                                            <button
                                                onClick={handleClick}
                                                type="button"
                                                className="btn">
                                                {loading ? "Loading..." : "SEND"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    <button onClick={() => setOpen(!open)} className={"chat-toggle"}>
                        <img src={chatOpened} alt={'chat opened'}/>
                    </button>
                </>
                :
                <>
                    <button onClick={() => setOpen(!open)} className={"chat-toggle"}>
                        <img src={chatClosed} alt={'chat closed'}/>
                    </button>
                </>
            }
        </>
    );

}

export default App;
