const addItems = document.querySelector('#add-items');
const itemsList = document.querySelector('#items-list');
let items = JSON.parse(localStorage.getItem('items')) || []; // on page load check if something is in local storage if not items = [];

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector('[name=item]').value; //value of text input
  let item = {
    text: text, // value of text input
    done: false
  };
  console.log(item); // object
  items.push(item); // push the object into the items array.
  populateList(items,itemsList); // run populateList function with items array and itemsList.
  localStorage.setItem('items', JSON.stringify(items));// set the items array into local storage , stringify turn objects into string
  this.reset(); // reset the form input
}

function populateList(itemsArray = [] , shoppingList) {
  shoppingList.innerHTML = itemsArray.map((item , i) => { // if item.done is true add checked state otherwise ''
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''}/>
        <label for="item${i}">${item.text}</label>
      </li>
    `;
  }).join(''); //map will return an array but we are setting innerHTML so we just need a string.
};

function toggleDone(e) {
  if(!e.target.matches('input')) return; //skip this unless its an input
  const el = e.target;
  const index = el.dataset.index; // element clicked index number
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit',addItem);
itemsList.addEventListener('click',toggleDone);
populateList(items, itemsList);

//reset
const reset = document.querySelector('#reset');

function resetf() {
  localStorage.clear();
  location.reload();
  itemsList.innerHTML = null
}
reset.addEventListener('click', resetf);

//uncheck all checkboxes
const uncheck = document.querySelector('#uncheck');

function uncheckf() {
  items.forEach(function(item) {
    if (item.done === true) {
        item.done = false;
    }
  });
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}
uncheck.addEventListener('click',uncheckf);

//check all checkboxes
const check = document.querySelector('#check');

function checkf() {
  items.forEach(function(item) {
    if (item.done === false) {
        item.done = true;
    }
  });
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

check.addEventListener('click', checkf);
