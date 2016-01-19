/**
 * Created by Aleksandr on 15.01.2016.
 */

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
var children = userInfo.children;

children.reverse();

var childrenList = document.getElementById("children-list");
var addChildBtn = document.getElementById('btn-add-child');
var dateLabel = document.getElementById('labelBirthDate');
var dateBirth = "";

function init() {

    createListItems();

    // Adding new child
    addChildBtn.addEventListener("click", addNewChild, false);

    var dtoption = {
        date: new Date(),
        mode: 'date'
    };

    dateLabel.addEventListener("click", function(){
        datePicker.show(dtoption, onSuccess);
    }, false);

}

function onSuccess(date) {
    var day = zeroFormat(date.getDate());
    var month = zeroFormat(date.getMonth() + 1);
    var year = date.getFullYear();

    dateBirth = day + '/' + month + '/' + year;
    alert('Selected date: ' + dateBirth);
    dateLabel.innerHTML = dateBirth;
}

function zeroFormat(value){
    if (value < 10){
        value = "0" + value;
    }
    return value;
}

function addNewChild(){
    var gender = checkRadio(document.getElementsByName("child-gender"));

    if(gender == undefined || dateBirth == ""){
        //alert("Please check all fields");
        navigator.notification.alert("Please check child gender and select birth date.", "", "Form message", "Ok");
        return;
    }

    children.unshift({"gender": gender, "date": dateBirth});

    childrenList.innerHTML = "";
    createListItems();
}

function removeChild(event){
    var targetElement = event.target || event.srcElement;
    var attr = targetElement.getAttribute("data-id");

    // Animation before deleting
    targetElement.parentNode.setAttribute("class", "removed");

    setTimeout(function(){
        children.splice(attr, 1);
        childrenList.innerHTML = "";
        createListItems();
    }, 300);
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