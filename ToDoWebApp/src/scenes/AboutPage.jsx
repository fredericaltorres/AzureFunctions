import React from "react";

export default () => (
  <div className="text-body">
		<h1>About</h1>
		<p>A To Do App written with
			<ul>
				<li>Front end: REACT + REDUX 
					(<a target="top" href="#" onClick={() =>{ alert('Not available yet'); }}>Source</a>).
				</li>
				<li>Back end: Azure Functions and Tables 
					(<a target="top" href="https://github.com/fredericaltorres/AzureFunctions/blob/master/AzureFunctions/REST%20API/AzureFunctions.REST.API.cs">Source</a>).
				</li>
			</ul>
		</p>
	</div>
);
