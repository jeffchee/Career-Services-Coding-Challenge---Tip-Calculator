$(document).ready(function () {
 
    var config = {
        apiKey: "AIzaSyCweVwtNwaWEU-cdT3IIkwKEi06VP3Za0o",
        authDomain: "tip-calculator-a3e46.firebaseapp.com",
        databaseURL: "https://tip-calculator-a3e46.firebaseio.com",
        projectId: "tip-calculator-a3e46",
        storageBucket: "tip-calculator-a3e46.appspot.com",
    }

    firebase.initializeApp(config);

    // switch for different inputs. both are shown in HTML but one is hidden from start.
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

    $("#addTip").on("click", function () {

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

                if (optionTwoB === 0) {
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

// ---------------------------------------------------------
// this is for mobile devices when they click enter, it does not immediately submit//
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

})