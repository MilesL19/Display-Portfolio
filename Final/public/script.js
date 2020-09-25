async function displayCoffee(){
    let response = await fetch('api/coffee/');
    let coffeeJSON = await response.json();
    let coffeeDiv = document.getElementById("coffee-list");
    coffeeDiv.innerHTML = "";

    for(i in coffeeJSON){
        let coffee = coffeeJSON[i];
        coffeeDiv.append(getCoffeeItem(coffee));
    }
}

function getCoffeeItem(coffee){
    let coffeeSection = document.createElement("section");
    coffeeSection.classList.add("coffee");

    let aTitle = document.createElement("a");
    aTitle.setAttribute("data-id", coffee._id);
    aTitle.href = "#";
    aTitle.onclick = showCoffeeDetails;
    
    let h3Elem = document.createElement("h3");
    h3Elem.textContent = `${coffee.name}: ${coffee.roast} roast`;
    aTitle.append(h3Elem);
    coffeeSection.append(aTitle);

    let editButton = document.createElement("button");
    editButton.textContent = "Re-brew";
    editButton.classList.add("coffee-buttons");
    editButton.onclick = toggleEditForm;
    
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("coffee-buttons");
    deleteButton.textContent = "Sell";
    deleteButton.onclick = deleteCoffee;

    coffeeSection.append(editButton);
    coffeeSection.append(deleteButton);
    return coffeeSection;
}

async function showCoffeeDetails() {
    let id = this.getAttribute("data-id");
    let response = await fetch(`/api/coffee/${id}`);

    if (response.status != 200) {
        //displaying message error
        console.log("Error receiving coffee");
        return;
    }

    let coffee = await response.json();
    let message = document.getElementById("result-message");
    message.textContent = "";
    message.classList.remove("hidden");

    let div = document.getElementById("message");
    div.classList.remove("hidden");

    let ulElem = document.createElement("ul");
    message.append(ulElem);

    let liRate = document.createElement("li");
    liRate.innerText = `Rating: ${coffee.rating}`;
    ulElem.append(liRate);

    let liPrice = document.createElement("li");
    liPrice.innerText = `Price: $${coffee.price}`;
    ulElem.append(liPrice);

    let liCaffeine = document.createElement("li");
    liCaffeine.innerText = `Caffeine: ${coffee.caffeine}`;
    ulElem.append(liCaffeine);

    

    document.getElementById("coffee-id").textContent = coffee._id;
    setTimeout(function() {message.classList.add("hidden")}, 5000);
}

function toggleAddForm() {
    let form = document.getElementById("add-form");
    let form2 = document.getElementById("edit-form");

    if (!form2.classList.contains("hidden")) {
        form2.classList.add("hidden");
    }

    form.classList.remove("hidden");

    let add = document.getElementById("btn-create-coffee");
    add.onclick = addCoffee;
}

function toggleEditForm() {
    let form = document.getElementById("edit-form");
    let form2 = document.getElementById("add-form");

    if (!form2.classList.contains("hidden")) {
        form2.classList.add("hidden");
    }

    form.classList.remove("hidden");

    let edit = document.getElementById("btn-edit-coffee");
    edit.onclick = editCoffee;
}

async function addCoffee() {
    let coffeeName = document.getElementById("txt-name").value;
    let coffeeRoast = document.getElementById("txt-roast").value;
    let coffeePrice = document.getElementById("txt-price").value;
    let coffeeCaffeine = document.getElementById("txt-caffeine").value;
    let coffeeRating = document.getElementById("txt-rating").value;
    let form = document.getElementById("add-form");
    let createBtn = document.getElementById("btn-create-coffee");

    form.classList.remove("hidden");

    let coffee = {"name":coffeeName, "roast":coffeeRoast, "price":coffeePrice, "caffeine":coffeeCaffeine, "rating":coffeeRating};

    let response = await fetch('/api/coffee',{
        method:"POST",
        headers:{
            'Content-Type':'application/json;charset=utf-8',
        },
        body:JSON.stringify(coffee),
    });

    if(response.status != 200) {
        console.log("ERROR ADDING COFFEEE");
        return;
    }

    let result = await response.json();
    console.log(result);
    
    //hide the form
    createBtn.onclick = form.classList.add("hidden");
    displayCoffee();
}

async function editCoffee() {
    let coffeeId = document.getElementById("coffee-id").textContent;
    let coffeeName = document.getElementById("txt-edit-name").value;
    let coffeeRoast = document.getElementById("txt-edit-roast").value;
    let coffeePrice = document.getElementById("txt-edit-price").value;
    let coffeeCaffeine = document.getElementById("txt-edit-caffeine").value;
    let coffeeRating = document.getElementById("txt-edit-rating").value;
    let editbutton = document.getElementById("btn-edit-coffee");
    let form = document.getElementById("edit-form");

    let coffee = {"name":coffeeName, "roast":coffeeRoast, "price":coffeePrice, "caffeine":coffeeCaffeine, "rating":coffeeRating};

    let response = await fetch(`/api/coffee/${coffeeId}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json;charset=utf-8',
        },
        body: JSON.stringify(coffee)
    });

    if(response.status != 200){
        console.log("Error updating coffee");
        return;
    }

    let result = await response.json();

    editbutton.onclick = form.classList.add("hidden");
    displayCoffee();
}

async function deleteCoffee() {
    let coffeeId = document.getElementById("coffee-id").textContent;

    let response = await fetch(`/api/coffee/${coffeeId}`, {
        method:"DELETE",
        headers: {
            'Content-Type':'application/json;charset=utf-8',
        }
    });

    if (response.status != 200) {
        console.log("Error deleting");
        return;
    }

    let result = await response.json();
    displayCoffee();
}

window.onload = function() {
    this.displayCoffee();

    let addBtn = document.getElementById("btn-add");
    addBtn.onclick = toggleAddForm;
}

