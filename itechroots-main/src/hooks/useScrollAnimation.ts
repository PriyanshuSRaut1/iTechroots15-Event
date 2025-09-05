import { useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const useScrollAnimation = (initialProps: any, inViewProps: any) => {
	const controls = useAnimation();
	const { ref, inView } = useInView({
		triggerOnce: false, 
		threshold: 0.1, 
	});
	
	useEffect(() => {
		if (inView) {
			controls.start(inViewProps);
		} else {
			controls.start(initialProps);
		}
	}, [inView, controls, initialProps, inViewProps]);

	return { ref, controls };
};

export default useScrollAnimation;