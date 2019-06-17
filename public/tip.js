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
        var x = document.getElementById("newUserInputs");
        if (x.style.display === "none") {
            x.style.display = "block";
            $("#prac").empty();
        } else {
            x.style.display = "none";
            // addingNewUserInput();
        }

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
        optionTwoA = "";
        optionTwoB = "";
        optionTwoSplitA = "";
        optionTwoSplitB = "";

        function rounding(x) {
            return x.toFixed(2);
        }

        totalTaxOutput = parseFloat(userInput) * (parseFloat(tipInput) / (100));
        totalTaxOutput = rounding(totalTaxOutput);
        console.log(totalTaxOutput);

        totalBalance = parseFloat(userInput) + parseFloat(totalTaxOutput);
        totalBalance = rounding(totalBalance);
        console.log(totalBalance);

        var optionTwoTotal = totalBalance;

        splitBetween = (parseFloat(totalBalance) / parseInt(splitInput));
        splitBetween = rounding(splitBetween);
        splitBetween = splitBetween
        console.log(splitBetween);

        optionOneTotal = parseInt(splitInput) * parseFloat(splitBetween);

        console.log(optionOneTotal)

        // cannot round here because otherwise it will defeat the purpose of trying to see if the totalbalance and the optionOneTotal is different or not.

        // bug fix for option 1 equal pay rounding up
        // --------------------------------------------------can make this a function for checking to make it clearer
// --
       

        if (totalBalance % splitInput === 0) {
            var optionTwoA = splitInput;
            var optionTwoSplitA = splitBetween;
            var optionTwoB = 0;
            var optionTwoSplitB = 0;

            
        } else {

            var balance = splitInput * splitBetween;

            if (totalBalance > balance) {

                var difference = totalBalance - balance;
                difference = rounding(difference);

                console.log(difference);
                var number = parseFloat(difference) * 100;
                console.log(number);
                // whatever the number will be will be the one that is going to need that 1 cent
                var optionTwoA = parseInt(number);
                var optionTwoSplitA = parseFloat(splitBetween) + 0.01;
                optionTwoSplitA = rounding(optionTwoSplitA);
                var optionTwoB = parseInt(splitInput) - parseInt(optionTwoA);
                var optionTwoSplitB = parseFloat(splitBetween);
                optionTwoSplitB = rounding(optionTwoSplitB);
                console.log("running if");


            } else {
                var splitBetween = parseFloat(splitBetween) - 0.01;
                var balance = splitInput * splitBetween;
                var difference = totalBalance - balance;
                difference = rounding(difference);

                console.log(difference);
                var number = parseFloat(difference) * 100;
                console.log(number);
                
                var optionTwoA = parseInt(number);
                var optionTwoSplitA = parseFloat(splitBetween) + 0.01;
                optionTwoSplitA = rounding(optionTwoSplitA);
                var optionTwoB = parseInt(splitInput) - parseInt(optionTwoA);
                var optionTwoSplitB = parseFloat(splitBetween);
                optionTwoSplitB = rounding(optionTwoSplitB);
                console.log("running else");

                if (optionTwoB ===0){
                    optionTwoSplitB = 0;
                }
            }

        }

        console.log("optionTwoA = " + optionTwoA)
        console.log("optionTwoSplitA = " + optionTwoSplitA)
        console.log("optionTwoB = " + optionTwoB)
        console.log("optionTwoSplitB = " + optionTwoSplitB)


        var cent1 = (parseFloat(splitInput) / 100);

        if (totalBalance > optionOneTotal) {
            console.log("fixing optionOneTotal")
            var optionOneFixTotal = parseFloat(optionOneTotal) + parseFloat(cent1);
            optionOneFixTotal = rounding(optionOneFixTotal);
            var splitBetween = (parseFloat(optionOneFixTotal) / parseInt(splitInput));
            splitBetween = rounding(splitBetween);
            optionOneTotal = parseInt(splitInput) * parseFloat(splitBetween);
            optionOneTotal = rounding(optionOneTotal)
        } else {
            optionOneTotal = rounding(optionOneTotal)
        }

        // option 2 split between for exact pay

        // -------------------------------








        firebase.database().ref().set({
            userInput: userInput,
            tipInput: tipInput,
            splitInput: splitInput,
            totalTaxOutput: totalTaxOutput,
            totalBalance: totalBalance,
            splitBetween: optionTwoSplitA,
            optionOneTotal: optionOneTotal,
            optionTwoTotal: optionTwoTotal,
            optionTwoSplitA: optionTwoSplitA,
            optionTwoSplitB: optionTwoSplitB,
            optionTwoA: optionTwoA,
            optionTwoB: optionTwoB,
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
        $("#option2TotalFinal").text(snapshot.val().optionTwoTotal);

        $("#optionTwoA").html(snapshot.val().optionTwoA);
        $("#optionTwoSplitA").text(snapshot.val().optionTwoSplitA);
        $("#optionTwoB").html(snapshot.val().optionTwoB);
        $("#optionTwoSplitB").text(snapshot.val().optionTwoSplitB);

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



})