
import React, { useState, useEffect } from "react";

import Prompt from "./components/Prompt/Prompt.js";
import Responses from "./components/Responses/Responses.js";

import "./App.scss";

let API_TOKEN = process.env.REACT_APP_API_KEY;

const DEFAULT_PROMPT = "Write poem about dinosaurs in snow.";

// GET THE RESPONSE
async function getResponse ( prompt ) {

	let response;

	let url = `https://api.openai.com/v1/engines/text-curie-001/completions`;
	
	let headers = {
		Authorization: `Bearer ${API_TOKEN}`,
		"Content-Type": "application/json"
	};

	let body = {
		prompt: prompt,
		temperature: 0.5,
		max_tokens: 150,
		top_p: 1.0,
		frequency_penalty: 0.0,
		presence_penalty: 0.0
	};

	try {
		response = await fetch(url, {
		method: "POST",
		headers,
		body: JSON.stringify(body)
		});
		return response.json();
	} catch (err) {
		console.error(err.message, err.stack);
	}
	};

	// PARSE THE RESPONSE
	function parseResponse (responseObject) {
	const { id, choices } = responseObject;
	return { id, responseString: choices[0].text };
	};

	// RENDERING FUNCTION
	export default function App() {
	// DECLARING STATES
	const [prompt, setPrompt] = useState("");
	const [responses, setResponses] = useState([]);
	const [submit, setSubmit] = useState(false)
	
	useEffect(() => {
		setInitialResponse();
	}, []);

	// FETCH AND SET INITIAL RESPONSE
	async function setInitialResponse () {
		const initialFetchData = await getResponse(DEFAULT_PROMPT);
		const initialResponseItem = parseResponse(initialFetchData);
		setResponses([
		...responses,
		{ prompt: DEFAULT_PROMPT, ...initialResponseItem }
		]);
	};

	// FORM CHANGE HANDLER
	function handleChange (e) {
		setPrompt(e.target.value);
	};
	// FORM SUBMIT HANDLER
	async function handleSubmit (e) {
		setSubmit(true);
		e.preventDefault();
		let newResponseItem;

		const data = await getResponse(prompt);
		const responseAttributes = parseResponse(data);
		newResponseItem = { prompt, ...responseAttributes };

		setPrompt("");
		setResponses([newResponseItem, ...responses]);
		setSubmit(false);
	};
	// RETURN COMPONENTS
	return (
		<div className="App">
		<Prompt
			prompt={prompt}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			submit={submit}
		/>
		<Responses responses={responses} />
		</div>
	);
}
