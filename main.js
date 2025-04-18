let title = document.getElementById("title")
let from = document.getElementById("from")
let to = document.getElementById("to")
let data = document.getElementById("date")
let time = document.getElementById("time")
let price = document.getElementById("price")
let roomNumber = document.getElementById("roomNumber")
let tripNumber = document.getElementById("tripNumber")
let submit = document.getElementById("sub")
let sort = document.getElementById("sort")

let mood = "add"
let temp;

// get data
let dataArray;
if (localStorage.alltrips != null) {
    dataArray = JSON.parse(localStorage.alltrips)
} else {
    dataArray = []
}

function getData() {
    let dataObject = {
        title: title.value,
        from: from.value,
        to: to.value,
        data: data.value,
        time: time.value,
        price: price.value,
        roomNumber: roomNumber.value,
        tripNumber: tripNumber.value
    }

if (mood === "add") {
    dataArray.push(dataObject)
}else{
    dataArray[    temp      ] = dataObject
}

    localStorage.setItem("alltrips", JSON.stringify(dataArray))    
    setData()

    title.value=""
    from.value=""
    to.value=""
    data.value=""
    time.value=""
    price.value=""
    roomNumber.value=""
    tripNumber.value=" "
}

// set data
function setData() {
    let table = ""
    for (let i = 0; i < dataArray.length; i++) {
        table += `
        <tr>
            <td>${dataArray[i].title} </td>
            <td>${dataArray[i].from} </td>
            <td>${dataArray[i].to}</td>
            <td>${dataArray[i].data}</td>
            <td>${dataArray[i].time} </td>
            <td>${dataArray[i].price} </td>
            <td>${dataArray[i].roomNumber} </td>
            <td>${dataArray[i].tripNumber} </td>
            <td><button onclick=" editTrip(${i})" id="edit">Edit</button></td>
            <td><button onclick=" deleteTrip(${i})" id="delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table
}
setData()

// delete trip
function deleteTrip(i) {
    dataArray.splice(i,1)
    localStorage.alltrips = JSON.stringify(dataArray)
setData()
}
// edit trip
function editTrip(i) {
    title.value=  dataArray[i].title
    from.value= dataArray[i].from
    to.value= dataArray[i].to
    data.value= dataArray[i].data
    time.value= dataArray[i].time
    price.value= dataArray[i].price
    roomNumber.value= dataArray[i].roomNumber
    tripNumber.value= dataArray[i].tripNumber
    submit.value="Add Edit"
    mood = "edit"
    temp = i
}
// sort

function sortData(value) {
let able;
    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].data.includes(value)) {
            able += `
        <tr>
            <td>${dataArray[i].title} </td>
            <td>${dataArray[i].from} </td>
            <td>${dataArray[i].to}</td>
            <td>${dataArray[i].data}</td>
            <td>${dataArray[i].time} </td>
            <td>${dataArray[i].price} </td>
            <td>${dataArray[i].roomNumber} </td>
            <td>${dataArray[i].tripNumber} </td>
            <td><button onclick=" editTrip(${i})" id="edit">Edit</button></td>
            <td><button onclick=" deleteTrip(${i})" id="delete">Delete</button></td>
        </tr>
        `
        }
        
    }
    document.getElementById("tbody").innerHTML = able
}

// inputs focus
function inpFocus() {
    document.querySelectorAll('input').forEach((input, index, inputs) => {
        input.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                let nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus(); 
                }
            }
        });
    });
}
inpFocus()