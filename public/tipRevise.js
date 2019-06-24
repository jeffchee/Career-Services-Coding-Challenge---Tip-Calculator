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

    function rounding(x) {
        return x.toFixed(2);
    }

    $("#customSwitch").on("click", function () {
        var x = document.getElementById("newUserInputs");
        var y = document.getElementById("customS")

        if (x.style.display === "none") {
            x.style.display = "block";
            y.style.display = "none";
        } else {
            x.style.display = "none";
            y.style.display = "block";
        }
    })

    $("#solve").on("click", function () {

        userInput = "";
        tipInput = "";
        splitInput = "";

        userInput = $("#userInput").val().trim();

        var rangeTip = document.getElementById("tipInput").value;
        var rangeSplit = document.getElementById("splitInput").value;
        var replaceTI = document.getElementById("replaceTipInput").value;
        var replaceSI = document.getElementById("replaceSplitInput").value;

        if (replaceTI > 0) {
            tipInput = replaceTI;
        } else {
            tipInput = rangeTip;
        }

        if (replaceSI > 0) {
            splitInput = replaceSI;
        } else {
            splitInput = rangeSplit;
        }
        console.log(userInput);
        console.log(tipInput);
        console.log(splitInput);

        totalTaxOutput = "";
        totalBalance = "";
        splitBetween = "";
        optionTwoTotal = "";

        var optionOneTotal="";
        var newSplitBetween="";

        var optionTwoA="";
        var optionTwoB="";
        var optionTwoSplitA="";
        var optionTwoSplitB="";


        totalTaxOutput = parseFloat(userInput) * (parseFloat(tipInput) / (100));
        totalTaxOutput = rounding(totalTaxOutput);
        console.log("totalTaxOutput:" + totalTaxOutput);

        totalBalance = parseFloat(userInput) + parseFloat(totalTaxOutput);
        totalBalance = rounding(totalBalance);
        console.log("totalBalance:" + totalBalance);

        var optionTwoTotal = totalBalance;
        console.log("optionTwoTotal:" + optionTwoTotal)

        splitBetween = (parseFloat(totalBalance) / parseInt(splitInput));
        splitBetween = rounding(splitBetween);
        console.log("splitBetween:" + splitBetween);


        checking1(totalBalance, splitInput, splitBetween);
        checking2(userInput, tipInput, splitInput, totalTaxOutput, totalBalance, splitBetween);

        firebase.database().ref().set({
            userInput: userInput,
            tipInput: tipInput,
            splitInput: splitInput,
            totalTaxOutput: totalTaxOutput,
            totalBalance: totalBalance,
            splitBetween: splitBetween,
            optionTwoTotal: optionTwoTotal,
            newSplitBetween: newSplitBetween,
            optionOneTotal: optionOneTotal,
            optionTwoSplitA: optionTwoSplitA,
            optionTwoSplitB: optionTwoSplitB,
            optionTwoA: optionTwoA,
            optionTwoB: optionTwoB,
        })


    })



    function checking1(totalBalance, splitInput, splitBetween) {

        var TB = totalBalance;
        var SI = splitInput;
        var SB = splitBetween;

        var cent1 = (parseFloat(SI) / 100);
        var newSplitBetween = "";
        var optionOneTotal = "";

        console.log(TB, SI, SB, cent1 + " checking1")

        newOptionOneTotal = parseInt(SI) * parseFloat(SB);
        console.log("newOptionOneTotal:" + newOptionOneTotal);


        if (TB > newOptionOneTotal) {
            console.log("fixing optionOneTotal")
            var optionOneFixTotal = parseFloat(newOptionOneTotal) + parseFloat(cent1);
            optionOneFixTotal = rounding(optionOneFixTotal);

            var newSplitBetween = (parseFloat(optionOneFixTotal) / parseInt(SI));
            newSplitBetween = rounding(newSplitBetween);

            optionOneTotal = parseInt(splitInput) * parseFloat(newSplitBetween);
            optionOneTotal = rounding(optionOneTotal);
            console.log("optionOneTotal if :" + optionOneTotal + " " + "newSplitBetween: " + newSplitBetween);


        } else {
            optionOneTotal = rounding(newOptionOneTotal);
            newSplitBetween = splitBetween;
            console.log("optionOneTotal else :" + optionOneTotal + " " + "newSplitBetween: " + newSplitBetween);

        }

        return firebase.database().ref().update({
            optionOneTotal: optionOneTotal,
            newSplitBetween: newSplitBetween
        });
    }




    function checking2(userInput, tipInput, splitInput, totalTaxOutput, totalBalance, splitBetween) {

        var UI = userInput;
        var TI = tipInput;
        var SI = splitInput;
        var TTO = totalTaxOutput;
        var TB = totalBalance;
        var SB = splitBetween;

        console.log(UI, TI, SI, TTO, TB, SB)

        if (TB % SI === 0) {
            var optionTwoA = SI;
            var optionTwoSplitA = SB;
            var optionTwoB = 0;
            var optionTwoSplitB = 0;

        } else {

            var balance = SI * SB;

            if (TB > balance) {

                var difference = totalBalance - balance;
                difference = rounding(difference);

                console.log(difference);
                var number = parseFloat(difference) * 100;
                console.log(number);
                // whatever the number will be will be the one that is going to need that 1 cent
                var optionTwoA = parseInt(number);
                var optionTwoSplitA = parseFloat(SB) + 0.01;
                optionTwoSplitA = rounding(optionTwoSplitA);

                var optionTwoB = parseInt(SI) - parseInt(optionTwoA);
                var optionTwoSplitB = parseFloat(SB);
                optionTwoSplitB = rounding(optionTwoSplitB);
                console.log("running if");

            } else {

                var SB = parseFloat(SB) - 0.01;
                var balance = SI * SB;

                var difference = TB - balance;
                difference = rounding(difference);

                console.log(difference);
                var number = parseFloat(difference) * 100;
                console.log(number);

                var optionTwoA = parseInt(number);
                var optionTwoSplitA = parseFloat(SB) + 0.01;
                optionTwoSplitA = rounding(optionTwoSplitA);

                var optionTwoB = parseInt(SI) - parseInt(optionTwoA);
                var optionTwoSplitB = parseFloat(SB);
                optionTwoSplitB = rounding(optionTwoSplitB);
                console.log("running else");

                if (optionTwoB === 0) {
                    optionTwoSplitB = 0;
                }
            }

        }

        console.log("optionTwoA = " + optionTwoA)
        console.log("optionTwoSplitA = " + optionTwoSplitA)
        console.log("optionTwoB = " + optionTwoB)
        console.log("optionTwoSplitB = " + optionTwoSplitB)

        return firebase.database().ref().update({
            optionTwoSplitA: optionTwoSplitA,
            optionTwoSplitB: optionTwoSplitB,
            optionTwoA: optionTwoA,
            optionTwoB: optionTwoB,
        });
    }



















    firebase.database().ref().on("value", function (snapshot) {
        $("#userOutputFeature").html(snapshot.val().userInput);
        $("#tipOutputFeature").html(snapshot.val().tipInput);
        $("#splitOutputFeature").html(snapshot.val().splitInput);

        $("#totalTaxOutput").text(snapshot.val().totalTaxOutput);
        $("#totalBalance").text(snapshot.val().totalBalance);

        $("#newSplitBetween").text(snapshot.val().newSplitBetween);
        $("#splitOutputFinal").html(snapshot.val().splitInput);

        $("#option1TotalFinal").text(snapshot.val().optionOneTotal);

        $("#option2TotalFinal").text(snapshot.val().optionTwoTotal);

        $("#optionTwoA").html(snapshot.val().optionTwoA);
        $("#optionTwoSplitA").text(snapshot.val().optionTwoSplitA);

        $("#optionTwoB").html(snapshot.val().optionTwoB);
        $("#optionTwoSplitB").text(snapshot.val().optionTwoSplitB);

    })
















    var inputs = document.querySelectorAll("input,select");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("keypress", function (e) {
            if (e.which == 13) {
                e.preventDefault();
                var nextInput = document.querySelectorAll('[tabIndex="' + (this.tabIndex + 1) + '"]');
                if (nextInput.length === 0) {
                    nextInput = document.querySelectorAll('[tabIndex="1"]');
                }
                nextInput[0].focus();
            }
        })
    }





    // displayign the value on the range

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


    // when user changes the range , the numbers will change
    tipInput.oninput = function () {
        tipOutput.innerHTML = this.value;
        tip = tipOutput.innerHTML;
        console.log("tip percentage is :" + tip);
    }

    splitInput.oninput = function () {
        splitOutput.innerHTML = this.value;
        split = splitOutput.innerHTML;
        console.log("split between " + split + " people");
    }

    tipOutput.innerHTML = tipInputValue;
    splitOutput.innerHTML = splitInputValue;






});