$(document).ready(function () {




    var userInput = document.getElementById("userInput");

    var tipRange = document.getElementById("tipRange");
    var tipOutput = document.getElementById("tipOutput");
    var splitInput = document.getElementById("splitInput");
    var splitOutput = document.getElementById("splitOutput");

    var tipRangeValue = tipRange.value
    var splitInputValue = splitInput.value
    var userInputValue = userInput.value

    var split = "";
    var range = "";

    console.log(tipRangeValue);
    console.log(splitInputValue);
    console.log(userInputValue);

    tipOutput.innerHTML = tipRangeValue;
    splitOutput.innerHTML = splitInputValue;

    tipRange.oninput = function () {
        tipOutput.innerHTML = this.value;
        this.range = tipOutput.innerHTML;
        range = this.range
        console.log("tip percentage is :" + range);

    }

    splitInput.oninput = function () {
        splitOutput.innerHTML = this.value;
        this.split = splitOutput.innerHTML;
        split = this.split
        console.log("split between " + split + " people");
        return split;
    }



    $("#addTip").on("click", function () {


        console.log(splitInput);

        
    })

    // 100 x % = X
    // X+100 = Y
    // Y/# = each 
    // if then statements to determine equal amounts or 


    // pseudo
    // get all the inputs
    // get the multipling and dividing of numbers down. the process

    // ** i want to make it live so when you move the numbers move too 

    // validation
    // if input of number is entered, app already ready to use with preset numbers
    // preset 10% /// 2 people

    // toggle1 is selected, it needs to wait for number to be inputted first before finishing
    // reminder that something is missing















})