import React from 'react';
import { AnimatedSwitch } from 'react-router-transition';
const TransitionSwitch = prop => {
	return (
		<AnimatedSwitch
			atEnter={{ opacity: 0 }}
			atLeave={{ opacity: 0 }}
			atActive={{ opacity: 1 }}
			className='switch-wrapper'
			{...prop}
		></AnimatedSwitch>
	);
};
export default TransitionSwitch;
