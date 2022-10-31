import React from "react";
import Lottie from "react-lottie";
import animationData from "./delivery-animation.json";

export default function DeliveryAnimation() {
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
