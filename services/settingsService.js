'use strict';

var settingsService = (function (memory) {
	var practice = memory.get('practice');
	if (practice === null) {
		practice = {
			magCount: 3,
			magRounds: 10,
			emergencyReloadSeconds: 2.4,
			safelyHolsterSeconds: 3,
			farTarget: { count: 3, seconds: 2 },
			middleTarget: { count: 4, seconds: 1.9 },
			closeTarget: { count: 5, seconds: 1.7 },
			failureToFire: { count: 1, seconds: 1.4 },
			failureToEject: { count: 1, seconds: 1.6 },
			failureToExtract: { count: 2, seconds: 5.7 },
			tacticalReload: { count: 2, seconds: 2.5 }
		};
		memory.set('practice', practice);
	}

	var ideas = memory.get('ideas');
	if (ideas === null) {
		ideas = [
			'Slow down the draw just enough to guarantee perfection',
			'Ensure a perfect grip every time',
			'Focus on support hand grip',
			'Hard focus on the front sight',
			'Ensure you are not bouncing or wasting body movement',
			'Think about the trigger prrressss',
			'Keep both eyes open',
			'Keep your eyes open for the blast',
			'Ensure: no anticipation',
			'Pay attention to your follow through',
			'Close your eyes until you feel sites on target',
			'Practice leaning behind cover',
			'Practice with forward back and side strafing',
			'Practice with your tack light',
			'Work on body pushing forward',
			'Work on speed, but stay in the A zone',
			'Turn your recoil and recovery into one smooth motion'
		];
		memory.set('ideas', ideas);
	}

	return {
		//objects
		practice: practice,
		ideas: ideas
	}
})(memoryService);
