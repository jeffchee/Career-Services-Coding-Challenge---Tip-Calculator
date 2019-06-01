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


    $("#addTip").on("click", function () {

        userInput = $("#userInput").val().trim();
        tipInput = $("#tipInput").val().trim();
        splitInput = $("#splitInput").val().trim();
        totalTaxOutput = "";
        totalBalance = "";
        splitBetween = "";

        if (userInput, tipInput, splitInput) {

            totalTaxOutput = parseFloat(userInput) * (parseFloat(tipInput)/(100));
            console.log(totalTaxOutput);
            totalBalance = parseFloat(userInput) + parseFloat(totalTaxOutput);
            console.log(totalBalance);
            splitBetween = (parseFloat(totalBalance) / parseInt(splitInput));
            console.log(splitBetween);
        } else {
            return error;
        }



        firebase.database().ref().set({
            userInput: userInput,
            tipInput: tipInput,
            splitInput: splitInput,
            totalTaxOutput: totalTaxOutput,
            totalBalance: totalBalance,
            splitBetween: splitBetween

        })

    
        solve();

    })

    firebase.database().ref().on("value", function (snapshot) {
        $("#userOutputFeature").html(snapshot.val().userInput);
        $("#tipOutputFeature").html(snapshot.val().tipInput);
        $("#splitOutputFeature").html(snapshot.val().splitInput);
        $("#splitOutputFinal").html(snapshot.val().splitInput);
        $("#totalTaxOutput").text(snapshot.val().totalTaxOutput);
        $("#totalBalance").text(snapshot.val().totalBalance);
        $("#splitBetween").text(snapshot.val().splitBetween);
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