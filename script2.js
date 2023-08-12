
// const document = dom.window.document;
// fn = document.getElementById('cap1')
// pg = document.getElementsByTagName('text1')
// faults2 = document.getElementById('faults2')
// add1 = document.getElementById('add1');
// pn = pg.length

// console.log(pg)
function search(key, fr)
{
	for (let i = 0;i < fr.length;i++) {
		if (fr[i] === key) {
			return true;
		}
	}
	return false;
}

// Function to find the frame that will not be used
// recently in future after given index in pg[0..pn-1]
function predict(pg, fr, pn, index)
{
	// Store the index of pages which are going
	// to be used recently in future
	let res = -1, farthest = index;
	for (let i = 0;i < fr.length;i++) {
		let j;
		for (j = index;j < pn;j++) {
			if (fr[i] === pg[j]) {
				if (j > farthest) {
					farthest = j;
					res = i;
				}
				break;
			}
		}

		// If a page is never referenced in future,
		// return it.
		if (j === pn) {
			return i;
		}
	}

	// If all of the frames were not in future,
	// return any of them, we return 0. Otherwise
	// we return res.
	return (res === -1) ? 0 : res;
}

 function optimalPage()
{
	{
		// Create an array for given number of
		// frames and initialize it as empty.
		let fr = [];

		// Traverse through page reference array
		// and check for miss and hit.
		let hit = 0;
		for (let i = 0;i < pn;i++) {

			// Page found in a frame : HIT
			if (search(pg[i], fr)) {
				hit++;
				continue;
			}

			// Page not found in a frame : MISS

			// If there is space available in frames.
			if (fr.length < fn) {
				fr.push(pg[i]);
			}

			// Find the page to be replaced.
			else {
				let j = predict(pg, fr, pn, i + 1);
				fr[j] = pg[i];
			}

		}
		 console.log("No. of hits = " + hit);
		 console.log("No. of misses = " + (pn - hit));
		// faults2.innerHTML = pn - hit;
		// document.getElementById('hits2').innerHTML = hit;
		// console.log("No.");

	}
}
let pg = [1,2,3,4,2,1,5,6,2,1,2,3,7,6,3,2,1,2,3,6];
let fn = 5;
var pn = pg.length
optimalPage(pg, pn, fn);


