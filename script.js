var cap = document.getElementById('cap');
var list = document.getElementById('list');
var text = document.getElementById('text');
var add = document.getElementById('add');
var fifo = document.getElementById('fifo');
var faults = document.getElementById('faults');
var hits = document.getElementById('hits');
var hit=0;
let page_faults = 0;
var indexes = [];
let s = new Set();
var i =0;

class Fifo extends Array {
	constructor(...elem) {
		super(...elem);
	}
	display_elements(s2) {
		for (let i = 0; i < s2.length; i++) {
			var x = document.createElement('li');
			var t = document.createTextNode(s2[i]);
			x.appendChild(t);
			list.appendChild(x);
		}
	}
}

function insertAt(array, index, ...elementsArray) {
    array.splice(index, 0, ...elementsArray);
}

let removeElement = (array, n) => {
	let newArray = [];
   
	for (let i = 0; i < array.length; i++) {
	  if (array[i] !== n) {
		newArray.push(array[i]);
	  }
	}
	return newArray;
};

const s1 = new Fifo();
function pageFaults()
{
	var pageValue = text.value;
	var capacity=cap.value;
	$('ul').empty();
	text.value='';

    // Check if the set can hold more pages
    if (s.size < capacity)
    {
    // Insert it leto set if not present
    // already which represents page fault
        if (!s.has(pageValue))
        {
            s.add(pageValue);
      
            // increment page fault
            page_faults++;
      
            // Push the current page leto the queue
            indexes.push(pageValue);
	    }
		else{
			hit++;
		}
    }
      
    // If the set is full then need to perform FIFO
    // i.e. remove the first page of the queue from
    // set and queue both and insert the current page
    else
    {
		if(i == capacity){
			i=0;
		}
        // Check if current page is not already
        // present in the set
        if (!s.has(pageValue))
        {
            //Pop the first page from the queue
            let val = indexes[i];
      
        	//indexes.shift();
			//arrayRemove(indexes,val);
			indexes = removeElement(indexes,val);
			
      
            // Remove the indexes page
            s.delete(val);
      
            // insert the current page
    	    s.add(pageValue);
      
            // push the current page leto
            // the queue
            //indexes.unshift(pageValue);
			insertAt(indexes,i++,pageValue);
      
            // Increment page faults
            page_faults++;
        }
		else{
			hit++;
		}
    }

	for(let j=indexes.length-1;j>=0;j--){
		s1.display_elements(indexes[j]);
	}

	faults.innerHTML=page_faults;
    hits.innerHTML=hit; 
}	