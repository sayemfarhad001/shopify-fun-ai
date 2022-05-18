import './Responses.scss';

export default function Responses ({ responses }) {
    return (
		<section className="responses">
			<h1>Responses</h1>
			{ responses.map((response) => (
				<div className="response__container" key={response.id}>
					<div className="response__prompt">
						<div className="response__label">Prompt:</div>
						<div className="response__field">{response.prompt}</div>
					</div>
					<div className="response__response">
						<div className="response__label">Reponse: </div>
						<div className="response__field">{response.responseString}</div>
					</div>
				</div>
			))}
		</section>
    );
};
  