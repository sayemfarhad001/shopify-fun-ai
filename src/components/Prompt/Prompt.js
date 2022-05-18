import './Prompt.scss';

export default function Prompt ({ handleSubmit, handleChange, prompt, submit }) {
    return (
		<section className="prompt">
			<h2>Fun with AI</h2>
			<form
			action="submit-prompt"
			method="GET"
			datatype="text"
			id="prompt-submission-form"
			onSubmit={handleSubmit}
			>
				<div className="prompt__input__container">
					<textarea
					id="prompt-input"
					value={prompt}
					onChange={handleChange}
					></textarea>
					<div className="button__container">
					<button type="submit" disabled={submit}>Submit</button>
					</div>
				</div>
			</form>
		</section>
    );
};
