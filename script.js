
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear')
const itemFilter = document.querySelector('#filter')
const formBtn = itemForm.querySelector('button');
let isEditMode = false




// / on add Item submit
function addItem(e){
    e.preventDefault()

    const newItem = itemInput.value

    //validate input

    if(newItem === ''){
        alert('Please add an item')
        return
    
}


if(isEditMode){

    const itemToEdit = itemList.querySelector('.edit')

    removeItemFromStorage(itemToEdit.textContent);
    itemFilter.classList.remove('edit')
    itemToEdit.remove()
    isEditMode = false
   
    //  const
}




//create list item

const li = document.createElement('li')

li.appendChild(document.createTextNode(newItem))


console.log(li)


const button = createButton('remove-item btn-link text-red');
li.appendChild(button)
itemList.appendChild(li)

addItemStorage(newItem)
checkUI()
itemInput.value =''
}


function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item =>  addItemToDOM(item))
    checkUI()

}


function addItemToDOM(newItem){
    const li = document.createElement('li')

li.appendChild(document.createTextNode(newItem))


console.log(li)


const button = createButton('remove-item btn-link text-red');
li.appendChild(button)
itemList.appendChild(li)
}

function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)

    return button
}


function createIcon(classes){
    const icon = document.createElement('i')
    icon.className = classes


    return icon



}


function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement)
    }
    else{
        setItemToEdit(e.target)

    }

}// setItem to edit

function setItemToEdit(item){
    isEditMode = true;


    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit'))



    item.classList.add('edit')
    formBtn.innerHTML = `<i class="fa-solid fa-pen"></i> Update Item `
    formBtn.style.backgroundColor =`#228B22`
    itemInput.value = item.textContent
}




function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage()

    // filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i ) =>  i !== item)
    // reset to local storage

    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function removeItem(item){

    if(confirm('Are you sure')){
        // remove item from Dom and storage
        item.remove()
        checkUI()

        removeItemFromStorage(item.textContent)
    }

    // if(e.target.parentElement.classList.contains('remove-item')){
     
    // if(confirm('Are you sure')){
    //     e.target.parentElement.parentElement.remove()}
    //     checkUI()
    // }

}

function clearItems(){

    // an option itemList.innerHTML = ``;

   while(itemList.firstChild){
       itemList.removeChild(itemList.firstChild)
   }
   localStorage.removeItems('items')
   checkUI()

    console.log('click')

}







function checkUI(){
    const items = itemList.querySelectorAll('li')

    if(items.length === 0){
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none';

    }

    else if(items.length > 0 ){
        clearButton.style.display = 'block'
        itemFilter.style.display = 'block'
    }

}

function filterWord(e){
    // get the tesxt that being text
    const text = e.target.value.toLowerCase()
    // always lowercase the words

    console.log(text,'this is text')

    let items = itemList.querySelectorAll('li')

 
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase()



     if(itemName.indexOf(text)  != -1){
         item.style.display ='flex'
     }
     else{

        item.style.display = 'none'

     }

    })

  

}




function addItemStorage(item){
    const itemsFromStorage = getItemsFromStorage()


    // if(localStorage.getItem('items') === null){
    //     itemsFromStorage = []
    // }
    // else{
    //     itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    // }

    // add to new item to array
    itemsFromStorage.push(item)

    // Convert to  JSON string and set to local storage
     localStorage.setItem('items',JSON.stringify(itemsFromStorage))

}



function getItemsFromStorage(){
    let itemsFromStorage;

    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }
    else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemsFromStorage;

}





// EVENT LISTENER


// initalize scope
function init(){
    
itemForm.addEventListener('submit',addItem)
itemList.addEventListener('click',onClickItem)
itemFilter.addEventListener('input',filterWord)

clearButton.addEventListener('click',clearItems)
document.addEventListener('DOMContentLoaded',displayItems)


checkUI()

}

// global scope
// itemForm.addEventListener('submit',addItem)
// itemList.addEventListener('click',removeItem)
// itemFilter.addEventListener('input',filterWord)

// clearButton.addEventListener('click',clearItems)
// document.addEventListener('DOMContentLoaded',displayItems)


// checkUI()

init()