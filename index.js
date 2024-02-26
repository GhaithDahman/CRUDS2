

let title = document.getElementById('title')
let id = document.getElementById('id')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let catgory = document.getElementById('catgory')
let creat = document.getElementById('creat')
let searsh = document.getElementById('searsh')
let by_id = document.getElementById('by-id')
let by_title = document.getElementById('by_title')
let delete_all = document.getElementById('delete-all')
let mode = 'create'
let tmp;
//Get Total   
  function getTotal(){

    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML =  result;
        total.style.background = 'green'
    }else{
        total.innerHTML = 0
        total.style.background = 'red'
    }
}

//Creat Data
 let dataArray =  [] ;
if(localStorage.product != null){
    dataArray=JSON.parse(localStorage.product);
}else{
    dataArray = [];
}


function creatData() {
    if(title.value  && id.value   && price.value   && taxes.value  && ads.value   && discount.value   && catgory.value != '') {
    let products = {
        id: id.value,
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catgory:catgory.value,
    }
// Count
if(mode === 'create'){
    if(products.count > 1){
        for(let i=0 ; i<products.count ; i++){
            dataArray.push(products);
        }
    }else {
        dataArray.push(products);
    }
}
else {
    dataArray[tmp] = products;
    mode = 'create';
    creat.innerHTML='Create';
    count.style.display='block'
}
    
 // Save Data
    localStorage.product = JSON.stringify(dataArray)
   // clear inputs
 
   title.value=price.value=taxes.value=ads.value=discount.value=count.value=catgory.value=id.value  = '';
    readData()
    getTotal()
 
    
  
}
else{
    alert('يرجى ملئ جميع الحقول المطلوبة')
     
}
}


// Read Data


function readData(){
    let show='';
    for(let i=0 ; i<dataArray.length ; i++){
        show += 
            `<tr class="hover:bg-zinc-800 duration-500">
                <td>${dataArray[i].id}</td>
                <td> ${dataArray[i].title}</td>
                <td>${dataArray[i].price}</td>
                <td>${dataArray[i].taxes}</td>
                <td>${dataArray[i].ads}</td>
                <td>${dataArray[i].discount}</td>
                <td>${dataArray[i].total}</td>
                <td>${dataArray[i].catgory}</td>
                <td> <button onclick="updateData(${i})" class="px-3 py-1 bg-blue-500 rounded-full my-2">Update</button></td>
                <td> <button onclick="deleteData(${i})" class="px-3 py-1 bg-red-600 rounded-full">Delete</button></td>
            </tr>`
    }

    document.getElementById('tbody') .innerHTML = show;

    if(dataArray.length > 0){
        delete_all.innerHTML = `  <button onclick="deleteAll()"  class=" duration-300 bg-blue-800 ml-2   py-2 rounded-xl text-lg w-full hover:bg-blue-500 hover:tracking-widest">Delete All (${dataArray.length})</button>`
    }else{
        delete_all.innerHTML=''
    }
}
readData()


// Delet Data

function deleteData(i){

    dataArray.splice(i,1);
    localStorage.product = JSON.stringify(dataArray);
    readData()
}

// Delete All 
function testDelet(){
    
}

function deleteAll(){

  localStorage.clear();
  dataArray.splice(0);
  readData();

}



// Update Data


 
function updateData(number){
 
    title.value = dataArray[number].title;
    id.value = dataArray[number].id;
    price.value = dataArray[number].price;
    taxes.value = dataArray[number].taxes;
    ads.value = dataArray[number].ads;
    discount.value = dataArray[number].discount;
    getTotal();
    count.style.display= 'none'
    catgory.value = dataArray[number].catgory;
    mode = 'update'
    creat.innerHTML = 'Update'
    tmp = number ;

    scroll({
        top:0,
        behavior: 'smooth'
    })
  
}



// Searsh 

let modeSearsh = 'Title';
let searshTitle = document.getElementById('by-title') 
let searshID = document.getElementById('by-id') 
 

function searshClick(id){

    if(id == 'by-title'){
        modeSearsh = 'Title';
        searsh.type = 'text'
    }
    else{
        modeSearsh = 'ID';
        searsh.type = 'number'
    }

    searsh.placeholder = "Searsh By "+ modeSearsh;
    searsh.focus();
    searsh.value = '';
    readData();
}




 function searshData(value){
  
    let show ='';
    for(let i=0 ; i<dataArray.length ; i++){


    if(modeSearsh == 'Title'){
        
       
            if(dataArray[i].title.includes(value.toLowerCase())){             
            show += 
                `<tr>
                    <td>${dataArray[i].id}</td>
                    <td> ${dataArray[i].title}</td>
                    <td>${dataArray[i].price}</td>
                    <td>${dataArray[i].taxes}</td>
                    <td>${dataArray[i].ads}</td>
                    <td>${dataArray[i].discount}</td>
                    <td>${dataArray[i].total}</td>
                    <td>${dataArray[i].catgory}</td>
                    <td> <button onclick="updateData(${i})" class="px-3 py-1 bg-blue-500 rounded-full my-2">Update</button></td>
                    <td> <button onclick="deleteData(${i})" class="px-3 py-1 bg-blue-500 rounded-full">Delete</button></td>
                </tr>`

                
            }
         
    
       
       
        document.getElementById('tbody') .innerHTML = show;

    }else{

       
            if(dataArray[i].id.includes(value)){             
            show += 
                `<tr>
                    <td>${dataArray[i].id}</td>
                    <td> ${dataArray[i].title}</td>
                    <td>${dataArray[i].price}</td>
                    <td>${dataArray[i].taxes}</td>
                    <td>${dataArray[i].ads}</td>
                    <td>${dataArray[i].discount}</td>
                    <td>${dataArray[i].total}</td>
                    <td>${dataArray[i].catgory}</td>
                    <td> <button onclick="updateData(${i})" class="px-3 py-1 bg-blue-500 rounded-full my-2">Update</button></td>
                    <td> <button onclick="deleteData(${i})" class="px-3 py-1 bg-blue-500 rounded-full">Delete</button></td>
                </tr>`

                
            }
       
    
       
       
        document.getElementById('tbody') .innerHTML = show;
    }
}
 }