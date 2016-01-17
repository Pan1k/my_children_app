/**
 * Created by Aleksandr on 15.01.2016.
 */

console.log("Loaded");

var userInfo = {
    "user-name": "Sally Smith",
    "avatar": null,
    "children": [{
        "gender": "1",
        "date": "02/03/2014"
    }, {
        "gender": "0",
        "date": "21/10/2015"
    }]
};

console.log(userInfo);

var children = userInfo.children;

children.reverse();

var childrenList = document.getElementById("children-list");

function init() {

    createListItems();

    var addChildBtn = document.getElementById('btn-add-child');

    // Adding new child
    addChildBtn.addEventListener("click", addNewChild, false);

}

function addNewChild(){
    var gender = checkRadio(document.getElementsByName("child-gender"));
    var birthDate = document.getElementById("inputBirthDate").value;

    if(gender == undefined){
        alert("Please check all fields");
        return;
    }

    children.unshift({"gender": gender, "date": birthDate});

    childrenList.innerHTML = "";
    createListItems();
}

function removeChild(event){
    var targetElement = event.target || event.srcElement;
    var attr = targetElement.getAttribute("data-id");

    children.splice(attr, 1);
    childrenList.innerHTML = "";
    createListItems();
}

function checkRadio(elems){
    for(var i = 0; i < elems.length; i++){
        if(elems[i].checked){
            return elems[i].value;
        }
    }
}

function createListItems(){

    for(var i = 0; i < children.length; i++) {

        // Adding elements to HTML
        var li = document.createElement("li");
        var spanGender = document.createElement("span");
        var spanBirthDate = document.createElement("span");
        var removeChildLink = document.createElement("a");

        // Set attributes
        spanBirthDate.setAttribute("class", "date");
        switch (children[i].gender) {
            case "1":
                spanGender.setAttribute("class", "icon icon-boy");
                break;
            case "0":
                spanGender.setAttribute("class", "icon icon-girl");
                break;

            default :
                spanGender.setAttribute("class", "icon icon-pregnant");
                break;
        }
        removeChildLink.setAttribute("data-id", i);
        removeChildLink.addEventListener("click", function(event){ removeChild(event); }, false);

        // Creating HTML format
        li.appendChild(spanGender);

        spanBirthDate.appendChild(document.createTextNode(children[i].date));
        li.appendChild(spanBirthDate);

        removeChildLink.appendChild(document.createTextNode("X"));
        li.appendChild(removeChildLink);

        childrenList.appendChild(li);

    }

}

window.addEventListener("load", init);
