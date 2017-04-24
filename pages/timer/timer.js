(function (settings, error, config) {
	'use strict';

	var lastSound = '';
	var schedule = [],
		mp3 = new Audio(),
		instructionCount = 0;

	function playSound(src, onended) {
		try {
			mp3 = new Audio();
			mp3.onerror = function (e) { error.write(['mp3.onerror', e]); };
			mp3.onended = function () { onended(); };
			mp3.src = src;
			mp3.play();
		} catch (e) {
			error.write(['playSound error', src, e]);
		}
	}

	function addToMenu(count, text, sound, time, rnd) {
		for (var c = 0; c < count; c++) {
			var index = rnd ? Math.floor(Math.random() * schedule.length) : schedule.length;
			schedule.splice(index, 0, { text: text, sound: sound, timer: time });
		}
	}

	function init() {
		//load the idea
		if (document.getElementById('timmer-idea')) {
			document.getElementById('timmer-idea').innerHTML = '<span class="light">&#128161; </span>' + settings.ideas[Math.floor(Math.random() * settings.ideas.length)];

			//build the schedule
			addToMenu(
				settings.practice.farTarget.count,
				'From the holster.<br \/>Aiming for the<br \/><br \/><span class="big">Far<\/span><br \/><br \/>target.<br \/>Ready...',
				'far',
				settings.practice.farTarget.seconds,
				false
			);
			addToMenu(
				settings.practice.middleTarget.count,
				'From the holster.<br \/>Aiming for the<br \/><br \/><span class="big">Middle<\/span><br \/><br \/>target.<br \/>Ready...',
				'middle',
				settings.practice.middleTarget.seconds,
				false
			);
			addToMenu(
				settings.practice.closeTarget.count,
				'From the holster.<br \/>Aiming for the<br \/><br \/><span class="big">Close<\/span><br \/><br \/>target.<br \/>Ready...',
				'close',
				settings.practice.closeTarget.seconds,
				false
			);
			addToMenu(
				settings.practice.failureToFire.count,
				'Type 1<br \/><br \/><span class="big">Failure to fire.<\/span><br \/><br \/>Ready...',
				't1',
				settings.practice.failureToFire.seconds,
				true
			);
			addToMenu(
				settings.practice.failureToEject.count,
				'Type 2<br \/><br \/><span class="big">Failure to eject.<\/span><br \/><br \/>Ready...',
				't2',
				settings.practice.failureToEject.seconds,
				true
			);
			addToMenu(
				settings.practice.failureToExtract.count,
				'Type 3<br \/><br \/><span class="big">Failure to extract.<\/span><br \/><br \/>Ready...',
				't3',
				settings.practice.failureToExtract.seconds,
				true
			);
			addToMenu(
				settings.practice.tacticalReload.count,
				'<span class="big">Tactical reload.<\/span><br \/><br \/>Ready...',
				'tr',
				settings.practice.tacticalReload.seconds,
				true
			);

			// emergency reloads when the first mags are empty
			var mag = settings.practice.magCount;
			var round = settings.practice.magRounds;
			var s = 0;
			while (s < schedule.length) {
				// reload time before each draw
				if (['far', 'middle', 'close'].indexOf(schedule[s].sound) !== -1) {
					schedule.splice(s, 0, {
						text: 'Safely<br \/><br \/><span class="big">holster<\/span><br \/><br \/>your pistol.',
						sound: 'holster',
						timer: settings.practice.safelyHolsterSeconds
					});
					s++;
				}

				// start counting rounds
				if (schedule[s].sound === 't3' || schedule[s].sound === 'tr') {
					//retain the current mag if there are no more mags
					if (mag > 1) {
						mag--;
						round = settings.practice.magRounds;
					}
				} else {
					round--;
				}
				s++;

				if (round <= 0 || mag <= 0) {
					if (round <= 0) {
						mag--;	//this mag subtraction happens here instead of when we reload so we dont ask users to reload and top up mags
					}

					if (mag <= 0) {
						// retrieve message when last mag is empty
						schedule.splice(s, 0, {
							text: 'Safely holster.<br \/>Wait until the range is clear<br \/>then retrieve your magazines<br \/><span class="big">reload<\/span> and make ready.',
							sound: 'reload',
							timer: 0
						});
						mag = settings.practice.magCount;
					} else {
						// timed emergency reloads when mags run out
						schedule.splice(s, 0, {
							text: '<span class="big">Emergency reload.<\/span><br \/><br \/>Ready...',
							sound: 'er',
							timer: settings.practice.emergencyReloadSeconds
						});
						// no mag subtraction here, we had to do it early so we could give the user efficient instructions
					}

					s++;
					round = settings.practice.magRounds;
				}
			}

			// after action drills at the end
			schedule.splice(s, 0, {
				text: 'Perform<br \/><br \/><span class="big">after action drills.<\/span><br \/>and a<br \/><span class="big">Tactical reload.<\/span>',
				sound: 'after',
				timer: 0
			});

			// intro at the begining before random stuff
			schedule.splice(0, 0, {
				text: 'Please adjust your volume now.<br \/><br \/>Do not let the tones rush you.<br \/>Feel free to use the pause button.',
				sound: 'intro',
				timer: 0
			});

			document.getElementById('timmer-play').text = 'Start';
		}
	}

	function tryBuz() {
		document.getElementById('timmer-spinner').style['animation'] = ''; //reset
		if (schedule[0].timer > 0) {
			if (schedule[0].sound === 'holster') {
				setTimeout(function () {
					tryInstruction();
				}, schedule[0].timer * 1000);
			} else {
				document.getElementById('timmer-play').setAttribute('disabled', 'disabled');
				document.getElementById('timmer-play').classList.add('disabled');

				setTimeout(function() {
					document.getElementById('timmer-instruction').innerHTML = '<span class="big">GO<\/span>';
					document.getElementById('timmer-spinner').style['border-color'] = 'lime';
					playSound(config.root + 'sound/buz.mp3', function () { });
					document.getElementById('timmer-spinner').style['animation'] = 'spin ' + schedule[0].timer + 's linear 1';

					setTimeout(function() {
						document.getElementById('timmer-instruction').innerHTML = '<span class="big">STOP<\/span>';
						document.getElementById('timmer-spinner').style['border-color'] = 'red';
						playSound(config.root + 'sound/buz.mp3', tryInstruction);
						document.getElementById('timmer-play').removeAttribute('disabled');
						document.getElementById('timmer-play').classList.remove('disabled');
					}, schedule[0].timer * 1000);
				}, Math.floor(Math.random() * 2000));
			}
		} else {
			tryInstruction();
		}
	}

	function tryInstruction() {
		if (document.getElementById('timmer-play').text === 'Pause') {
			var percent = parseInt((instructionCount - schedule.length) / instructionCount * 100);
			document.getElementById('timmer-progress').style['flex-grow'] = percent;
			document.getElementById('timmer-remaining').style['flex-grow'] = 100 - percent;

			schedule.splice(0, 1);
			if (schedule.length > 0) {
				document.getElementById('timmer-instruction').innerHTML = schedule[0].text;
				playSound(config.root + 'sound/' + schedule[0].sound + '.mp3', tryBuz);
			} else {
				document.location.href = 'index.html';
			}
		}
	}

	function playPause() {
		if (document.getElementById('timmer-play').text === 'Start') {
			schedule.splice(0, 0, {
				text: 'this blank makes the splice in tryInstruction simple',
				sound: 'intro',
				timer: 0
			});
			instructionCount = schedule.length;
			document.getElementById('timmer-play').text = 'Pause';
			document.getElementById('timmer-spinner').style['animation'] = 'spin 7.5s linear 1';
			tryInstruction();
		} else if (document.getElementById('timmer-play').text === 'Pause') {
			document.getElementById('timmer-play').text = 'Play';
			mp3.pause();
		} else {
			document.getElementById('timmer-play').text = 'Pause';
			mp3.play();
		}
	}

	//events
	if (document.getElementById('timmer-play')) {
		document.getElementById('timmer-play').onclick = function () { playPause(); };
	}

	init();
})(settingsService, logService, configService);