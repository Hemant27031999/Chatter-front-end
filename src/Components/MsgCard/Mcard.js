import React from 'react';

const Mcard = (props) => {

	return (
		<div>
		{	props.name === "Ruke"?
		<p className="f5 fr w-60 link br3 ph3 pv2 mb2 white bg-near-black">
			{props.msg}
		</p>:
		<p className="f5 fl w-60 link br3 ph3 pv2 mb2 white bg-dark-green">
			{props.msg}
		</p>
		}
	</div>
	);

}

export default Mcard;

// import React from 'react';

// const Card = (props) => {
// 	return (
// 		<div className = 'bg-light-green dib ma2 pa3 br3 grow tc shadow-5' >
// 			<img  alt='robot' src={`https://robohash.org/${props.id}?200*200`}/>
// 			<div>
// 				<h2>{props.name}</h2>
// 				<p>{props.email}</p>
// 			</div>
// 		</div>
// 		);
// }

// export default Card;




// import React from 'react';

// class Mcard extends React.Component {

// 	constructor(props){
// 		super(props);
// 	}

// 	render(){
// 	return (
// 		<div>
// 		{	this.props.name === "Ruke"?
// 		<p className="f5 fr w-60 link br3 ph3 pv2 mb2 white bg-near-black">
// 			{this.props.msg}
// 		</p>:
// 		<p className="f5 fl w-60 link br3 ph3 pv2 mb2 white bg-dark-green">
// 			{this.props.msg}
// 		</p>
		
		
// 		}
// 	</div>
// 	);
// }
// }