(function (settings, memory, error) {
	'use strict';

	function showObject(thatMap) {
		document.location.href = '#pages/settings/setting.htm';

		if (document.getElementById('setting-object')) {
			document.getElementById('setting-object').innerHTML = '';
			for (var m = 0; m < thatMap.length; m++) {
				document.getElementById('setting-object').innerHTML += thatMap[m];
				if (m + 1 < thatMap.length) {
					document.getElementById('setting-object').innerHTML += '.';
				}
			}
		}
	}

	function onlyShow(id) {
		var hide = ['setting-edit', 'setting-add', 'setting-remove-div'];

		if (document.getElementById(id)) {
			for (var h = 0; h < hide.length; h++) {
				if (document.getElementById(hide[h])) {
					document.getElementById(hide[h]).classList.add('hidden');
				}
			}
			document.getElementById(id).classList.remove('hidden');
		}
	}

	function edit(thatMap, thatType, thatValue) {
		onlyShow('setting-edit');
		showObject(thatMap);

		switch (thatType) {
			case '[object String]':
				document.getElementById('setting-value').type = 'string';
				document.getElementById('setting-value').style.width = '100%';
				break;
			case '[object Number]':
				document.getElementById('setting-value').type = 'number';
				document.getElementById('setting-value').style.width = '40%';
				break;
			default:
				error.write(['Missing settings edit type for', thatMap, thatType, thatValue]);
		}

		document.getElementById('setting-value').value = thatValue;
		document.getElementById('setting-value').focus();
	}

	function add(thatMap, thatType) {
		onlyShow('setting-add');
		showObject(thatMap);

		if (document.getElementById('setting-addvalue')) {
			switch (typeof thatType[0]) {
			case 'string':
				document.getElementById('setting-addvalue').type = 'string';
				document.getElementById('setting-addvalue').style.width = '100%';
				break;
			case 'number':
				document.getElementById('setting-addvalue').type = 'number';
				document.getElementById('setting-addvalue').style.width = '40%';
				break;
			default:
				error.write(['Missing settings add type for', thatMap, thatType]);
			}

			document.getElementById('setting-addvalue').focus();
		}
	}

	function remove(thatMap, thatValue) {
		onlyShow('setting-remove-div');
		showObject(thatMap);

		var select = document.getElementById('setting-remove');
		if (select) {
			for (var i = 0; i < thatValue.length; i++) {
				var option = document.createElement('option');
				option.text = thatValue[i];
				option.value = i;
				select.add(option);
			}

			document.getElementById('setting-addvalue').focus();
		}
	}

	function getObjects(name, obj, map) {
		var table = document.createElement('table');

		for (var key in obj) if (obj.hasOwnProperty(key)) (function(thatkey) {
			var thatValue = obj[thatkey];
			var thatType = Object.prototype.toString.call(thatValue);	//this tells me if its an array or not, typeof does not
			var row = table.insertRow();
			var cell = row.insertCell();
			var thatMap = map.slice(0);
			thatMap.push(thatkey);

			var aa = document.createTextNode(thatkey.replace(/([A-Z])/g, ' $1'));
			cell.appendChild(aa);

			switch (thatType) {
				case '[object Array]':
					//only allow edit if the array is down to the final primitive
					if (typeof thatValue[0] === 'string' || typeof thatValue[0] === 'number') {
						var abreak = document.createElement('br');
						cell.appendChild(abreak);
						var bbreak = document.createElement('br');
						cell.appendChild(bbreak);

						var atext = document.createTextNode('+');
						var abutton = document.createElement('a');
						abutton.appendChild(atext);
						abutton.classList.add('button', 'cold');
						abutton.onclick = function () { add(thatMap, thatType); };
						cell.appendChild(abutton);

						var abreak = document.createElement('br');
						cell.appendChild(abreak);
						var abreak = document.createElement('br');
						cell.appendChild(abreak);

						var rtext = document.createTextNode(' - ');
						var rbutton = document.createElement('a');
						rbutton.appendChild(rtext);
						rbutton.classList.add('button', 'cold');
						rbutton.onclick = function () { remove(thatMap, thatValue); };
						cell.appendChild(rbutton);
					}
					break;
				case '[object Object]':
					break;
				case '[object String]':
				case '[object Number]':
					cell = row.insertCell();
					var sinput = document.createElement('input');
					sinput.id = name + '-' + thatkey;
					sinput.type = 'button';
					sinput.value = thatValue;
					if (thatValue.length > 25) {
						console.log(thatValue);
					}
					sinput.onclick = function () { edit(thatMap, thatType, thatValue); };
					cell.appendChild(sinput);

					//cell = row.insertCell();
					//var stext = document.createTextNode('\uD83D\uDD89');
					//var sedit = document.createElement('span');
					//sedit.classList.add('edit');
					//sedit.appendChild(stext);
					//sedit.onclick = function () { edit(thatMap, thatType, thatValue) }
					//cell.appendChild(sedit);
					break;
				default:
					error.write(['Missing settings get for', thatMap, thatType, thatkey, thatValue]);
			}

			if (typeof thatValue == 'object') {
				cell = row.insertCell();
				var t = getObjects(thatkey, thatValue, thatMap);
				cell.appendChild(t);
			}
		})(key);

		return table;
	}

	function init() {
		var page = document.getElementById('settings');

		if (page) {
			while (page.firstChild) {
				page.removeChild(page.firstChild);
			}
			page.appendChild(
				getObjects('settings', settings, [])
			);
		}
	}

	function setReference(obj, map, value) {
		for (var m = 1; m + 1 < map.length; m++) {
			obj = obj[map[m]];
		}

		var val = null;
		if (obj) {
			switch (typeof obj[map[map.length - 1]]) {
				case 'number':
					val = parseFloat(value);
					break;
				case 'string':
					val = value;
					break;
				default:
					error.write(['Missing set type for', typeof obj[map[map.length - 1]]]);
			}
			obj[map[map.length - 1]] = val;
		}
	}

	function addReference(obj, map, value) {
		for (var m = 1; m + 1 < map.length; m++) {
			obj = obj[map[m]];
		}

		var val = null;
		if (obj) {
			switch (typeof obj[0]) {
				case 'number':
					val = parseFloat(value);
					break;
				case 'string':
					val = value;
					break;
				default:
					error.write(['Missing add type for', typeof obj[map[map.length - 1]]]);
			}
			obj.push(val);
		}
	}

	function removeReference(obj, map, index) {
		if (obj) {
			for (var m = 1; m + 1 < map.length; m++) {
				obj = obj[map[m]];
			}
			obj.splice(index, 1);
		}
	}

	function saveEdit() {
		if (document.getElementById('setting-object')) {
			var thisMap = document.getElementById('setting-object').innerHTML.split('.');
			var obj = memory.get(thisMap[0]);

			setReference(
				obj,
				thisMap,
				document.getElementById('setting-value').value
			);
			memory.set(thisMap[0], obj);
			document.location.reload();
		}
	}

	function saveAdd() {
		if (document.getElementById('setting-object')) {
			var thisMap = document.getElementById('setting-object').innerHTML.split('.');
			var obj = memory.get(thisMap[0]);

			addReference(
				obj,
				thisMap,
				document.getElementById('setting-addvalue').value
			);
			memory.set(thisMap[0], obj);
			document.location.href = document.location.pathname;
			document.location.reload();
		}
	}

	function saveRemove() {
		if (document.getElementById('setting-object')) {
			var thisMap = document.getElementById('setting-object').innerHTML.split('.');
			var obj = memory.get(thisMap[0]);

			removeReference(
				obj,
				thisMap,
				parseInt(document.getElementById('setting-remove').value)
			);
			memory.set(thisMap[0], obj);
			document.location.reload();
		}
	}

	//events
	if (document.getElementById('setting-save')) {
		document.getElementById('setting-save').onclick = function () { saveEdit(); };
		document.getElementById('setting-addsave').onclick = function () { saveAdd(); };
		document.getElementById('setting-removesave').onclick = function () { saveRemove(); };
	}

	init();
})(settingsService, memoryService, logService);