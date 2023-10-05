
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear')
const itemFilter = document.querySelector('#filter')





function addItem(e){
    e.preventDefault()

    const newItem = itemInput.value

    //validate input

    if(newItem === ''){
        alert('Please add an item')
        return
    
}


//create list item

const li = document.createElement('li')

li.appendChild(document.createTextNode(newItem))


console.log(li)


const button = createButton('remove-item btn-link text-red');
li.appendChild(button)
itemList.appendChild(li)
checkUI()
itemInput.value =''



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


function removeItem(e){

    if(e.target.parentElement.classList.contains('remove-item')){
     
    if(confirm('Are you sure')){
        e.target.parentElement.parentElement.remove()}
        checkUI()
    }

}


function clearItems(){

    // an option itemList.innerHTML = ``;

   while(itemList.firstChild){
       itemList.removeChild(itemList.firstChild)
       checkUI()
   }

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
    let itemsFromStorage;


    if(localStorage.getItem('items') === null){
        itemsFromStorage = []
    }
    else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }



    // add to new item to array
    itemsFromStorage.push(item)

    // Convert to  JSON string and set to local storage
     localStorage.setItem('items',JSON.stringify(itemsFromStorage))

}





// EVENT LISTENER

itemForm.addEventListener('submit',addItem)
itemList.addEventListener('click',removeItem)
itemFilter.addEventListener('input',filterWord)

clearButton.addEventListener('click',clearItems)


checkUI()