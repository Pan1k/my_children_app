/**
 * Created by Aleksandr on 15.01.2016.
 */

console.log("Loaded");

function init() {
    var children = [{
        "gender": "1",
        "date": "02/03/2014"
    },{
        "gender": "0",
        "date": "21/10/2015"
    }];

    for(var i = 0; i < children.length; i++){
        createListItems(children, i);
    }

    var addChildBtn = document.getElementsByClassName('btn-add-child');

}

function createListItems(data, i){

    var list = document.getElementById("children-list");

    // Adding elements to HTML
    var li = document.createElement("li");
    var spanGender = document.createElement("span");
    var spanBirthDate = document.createElement("span");
    var removeChildLink = document.createElement("a");

    // Set attributes
    spanBirthDate.setAttribute("class", "date");
    switch (data[i].gender){
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

    // Creating HTML format
    spanBirthDate.appendChild(document.createTextNode(data[i].date));
    removeChildLink.appendChild(document.createTextNode("X"));
    li.appendChild(spanGender);
    li.appendChild(spanBirthDate);
    li.appendChild(removeChildLink);
    list.appendChild(li);
}

window.addEventListener("load", init);
