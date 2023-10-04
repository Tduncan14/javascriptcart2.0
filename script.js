
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');

const clearButton = document.querySelector('#clear')



function addItem(e){
    e.preventDefault()

    const newItem = itemInput.value

    //validate input

    if(itemInput === ''){
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
     
        e.target.parentElement.parentElement.remove()
    }

}




// EVENT LISTENER

itemForm.addEventListener('submit',addItem)
itemList.addEventListener('click',removeItem)

clearButton.addEventListener('click',clearItems)
