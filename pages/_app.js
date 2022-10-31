import Router from "next/router";
import nProgress from "nprogress";
import "../styles/globals.css"
import "../styles/nprogress.css";
import AOS from "aos";
import "aos/dist/aos.css";
import React from "react";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {
	React.useEffect(() => {
		AOS.init({
			once: true,
		});
	});
	return <Component {...pageProps} />;
}

export default MyApp;
