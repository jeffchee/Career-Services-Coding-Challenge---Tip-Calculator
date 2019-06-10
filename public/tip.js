$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyCweVwtNwaWEU-cdT3IIkwKEi06VP3Za0o",
        authDomain: "tip-calculator-a3e46.firebaseapp.com",
        databaseURL: "https://tip-calculator-a3e46.firebaseio.com",
        projectId: "tip-calculator-a3e46",
        storageBucket: "tip-calculator-a3e46.appspot.com",
    }

    firebase.initializeApp(config);

    var database = firebase.database();

    var userInput = "";
    var tipInput = "";
    var splitInput = "";

    $("#customSwitch").on("click", function () {




    })



    $("#addTip").on("click", function () {

        userInput = $("#userInput").val().trim();
        tipInput = $("#tipInput").val().trim();
        splitInput = $("#splitInput").val().trim();
        totalTaxOutput = "";
        totalBalance = "";
        splitBetween = "";
        optionOneTotal = "";
        optionTwoTotal = "";

        function rounding(x) {
            return x.toFixed(2);
        }

        totalTaxOutput = parseFloat(userInput) * (parseFloat(tipInput) / (100));
        totalTaxOutput = rounding(totalTaxOutput);
        console.log(totalTaxOutput);
        totalBalance = parseFloat(userInput) + parseFloat(totalTaxOutput);
        totalBalance = rounding(totalBalance);
        console.log(totalBalance);
        splitBetween = (parseFloat(totalBalance) / parseInt(splitInput));
        splitBetween = rounding(splitBetween);
        console.log(splitBetween);
        optionOneTotal = parseFloat(splitInput) * parseFloat(splitBetween);
        optionOneTotal = rounding(optionOneTotal);
        console.log(optionOneTotal)

        // bug fix for option 1 equal pay rounding up

        var cent1 = (splitInput / 100);
        if (totalBalance > optionOneTotal) {
            var optionOneTotal = optionOneTotal + cent1;
            optionOneTotal = rounding(optionOneTotal);
            var splitBetween = optionOneTotal / splitInput;
            splitBetween = rounding(splitBetween);
        } 
        console.log(splitBetween);
        console.log(optionOneTotal)

        firebase.database().ref().set({
            userInput: userInput,
            tipInput: tipInput,
            splitInput: splitInput,
            totalTaxOutput: totalTaxOutput,
            totalBalance: totalBalance,
            splitBetween: splitBetween,
            optionOneTotal: optionOneTotal,
            optionTwoTotal: optionTwoTotal,
        })

    })




    // function option2 (TB, splitBetween){
    //     for (var i = splitBetween; splitBetween>0; i--) {

    //         if(TB%i===0){
    //             var 
    //         } else {
    //             return error;
    //         }

    //     }
    // }


    // need to find out the way to split and roundup for the figures and to make it display the number of people and ammount each people should owe.

    firebase.database().ref().on("value", function (snapshot) {
        $("#userOutputFeature").html(snapshot.val().userInput);
        $("#tipOutputFeature").html(snapshot.val().tipInput);
        $("#splitOutputFeature").html(snapshot.val().splitInput);
        $("#totalTaxOutput").text(snapshot.val().totalTaxOutput);
        $("#totalBalance").text(snapshot.val().totalBalance);
        $("#splitBetween").text(snapshot.val().splitBetween);
        $("#splitOutputFinal").html(snapshot.val().splitInput);
        $("#option1TotalFinal").text(snapshot.val().optionOneTotal);
    })

    // var userInput = document.getElementById("userInput");

    var tipInput = document.getElementById("tipInput");
    var splitInput = document.getElementById("splitInput");

    // var splitOutput = document.getElementById("splitOutput");
    // var tipOutput = document.getElementById("tipOutput");

    var tipInputValue = tipInput.value
    var splitInputValue = splitInput.value
    var userInputValue = userInput.value

    // var split = "";
    // var Input = "";

    console.log(tipInputValue);
    console.log(splitInputValue);
    console.log(userInputValue);

    tipOutput.innerHTML = tipInputValue;
    splitOutput.innerHTML = splitInputValue;

    // when user changes the range , the numbers will change



    var tip = "";
    var split = "";

    tipInput.oninput = function () {
        tipOutput.innerHTML = this.value;
        this.tip = tipOutput.innerHTML;
        tip = this.tip
        console.log("tip percentage is :" + tip);
    }

    splitInput.oninput = function () {
        splitOutput.innerHTML = this.value;
        this.split = splitOutput.innerHTML;
        split = this.split
        console.log("split between " + split + " people");
    }




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