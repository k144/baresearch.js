// baresearch.js - an extremly small public domain search filter library
// https://k144.github.io/baresearch.js

document.addEventListener("DOMContentLoaded", function() {

	// any element with a value property will work as a .baresearch-search
	let searchElements = document.getElementsByClassName("baresearch-search");
	for (let i=0; i<searchElements.length; i++) {

		let searchElement = searchElements[i];
		searchElement.addEventListener("input", update);

		let visible = []; // array of elements that passed check(), stored for optimisation

		// updates the visibility of every item based on search value
		function update(e) {
			let val = searchElement.value;
			let vlen = visible.length;
			let itemsContainer = searchElement.parentElement
				.querySelector(".baresearch-items");
			// When characters are only added to the search,
			// the result is never going to grow. You don't
			// have to recheck every single element on the page.
			if (vlen > 0 && e.inputType == "insertText") {
				let newVisible = [];
				for (let j=0; j<vlen; j++) {
					if (check(visible[j], val)) {
						newVisible.push(visible[j])
					}
				}
				visible = newVisible;

			// the default behaviour - recheck everything
			} else {
				let items = itemsContainer.children;
				visible = [];
				for (let j=0; j<items.length; j++) {
					check(items[j], val);
				}
			}

			let emptyMessage = searchElement.parentElement.querySelector(".baresearch-empty");
			if (visible.length > 0) {
				emptyMessage.style.display = "none";
				itemsContainer.style.display = "block";
			} else {
				emptyMessage.style.display = "block";
				itemsContainer.style.display = "none";
			}
		}
		update();

		// shows and hides elements, updates visible[], returns a boolean
		function check(element, val) {
			// Suggestion:
			// add
			//.replace(/\s+/g, "")
			// after element.innerText.toLowerCase() and val.toLowerCase()
			// to ignore whitespace
			// -----------------------------------------------------------
			// remove .toLowerCase() to make search case insensitive
			if (element.innerText.toLowerCase().includes(val.toLowerCase())) {
				element.style.display = "block";
				visible.push(element);
				return true;
			} else {
				element.style.display = "none";
				return false;
			}
		}

		// Alternative check function the with ablitiy to ignore diacritics,
		// ignore common typos, match Roman numerals as Arabic numerals,
		// or in general match an alternative version of a string.
		// Don't forget to remove/comment-out the default one,
		// and to remove parts you don't need.
		/*
		function check(elm, val) {
			val = val
				.toLowerCase() // remove this for case sensitive search
				.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") // escape regex characters
				//.replace(/\s+/g, "") // uncomment to ignore whitespace. Also add it to the last if
			;

			// TODO: Create files  with pairs to copy for different languages.
			//       A helper script wouldn't hurt too.
			let altPairs = [
				// Polish - polski
				["ą", "a"],
				["ć", "c"],
				["ę", "e"],
				["ń", "n"],
				["ó", "o"],
				["ś", "s"],
				["ż", "z"],
				["ź", "z"],
				["ó", "u"],
				["ż", "rz"],

				// German - Deutsch
				["ä", "a"],
				["ö", "o"],
				["ü", "u"],
				["ß", "ss"],
				["ö", "u"],

				// Roman numerals
				["x.", "10."],
				["x ", "10 "],
				["x", "1"], // this makes matching 11-18 possible basically for free
				["ix", "9"],
				["viii", "8"],
				["vii", "7"],
				["vi", "6"],
				["v", "5"],
				["iv", "4"],
				["iii", "3"],
				["ii", "2"],
				["i", "1"],
			];

			for (let i=0; i<altPairs.length; i++) {
				if(val.includes(altPairs[i][1])) {
					val = val.replace(
						altPairs[i][1],
						`(${altPairs[i][0]}|${altPairs[i][1]})`
					);
				}
			}

			// Suggestion:
			// add
			//.replace(/\s+/g, "")
			// after .innerText to ignore whitespace. Make sure val
			// (on top of the function) has that uncommented too.
			// -----------------------------------------------------
			// change "mi" to "m" for case insesitive search
			if (elm.innerText.match(new RegExp(val, "mi"), val)) {
				elm.style.display = "inherit";
				visible.push(elm);
			} else {
				elm.style.display = "none";
			}

		}
		*/

	}


});