import React from "react";
import Lottie from "react-lottie";
import animationData from "./checkout-animation.json";

export default function CheckoutAnimation() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<Lottie
			options={defaultOptions}
			height={400}
			width={500}
			isClickToPauseDisabled={true}
		/>
	);
}