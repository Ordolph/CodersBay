// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)


// Assign the reference to the database to a variable named 'database'
// var database = ...
var config = {
  apiKey: "AIzaSyAo71Ymf_jSAHlTV_ZiAsWc6ofj9ZQwYhY",
  authDomain: "codersbay-6a7ae.firebaseapp.com",
  databaseURL: "https://codersbay-6a7ae.firebaseio.com",
  projectId: "codersbay-6a7ae",
  storageBucket: "codersbay-6a7ae.appspot.com",
  messagingSenderId: "261716702762"
};
firebase.initializeApp(config);

var database = firebase.database();

// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;
var highBidderDisplay = $("#highest-bidder");
var highPriceDisplay = $("#highest-price");

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function (snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the variables for highBidder/highPrice equal to the stored values in firebase.
    highPrice = snapshot.val().highPrice;
    // highPrice = ...
    highBidder = snapshot.val().highBidder;
    // highBidder = ...


    // Change the HTML to reflect the stored values
    highBidderDisplay.text(highBidder);
    highPriceDisplay.text(highPrice);

    // Print the data to the console.
    console.log(highBidder);
    console.log(highPrice);

  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the initial values
    highBidderDisplay.text(initialBidder);
    highPriceDisplay.text(initialBid);

    // Print the data to the console.

    console.log(highBidderDisplay.text());
    console.log(highPriceDisplay.text());
  }


  // If any errors are experienced, log them to console.
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function (event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  bidderPrice = Number($("#bidder-price").val());
  bidderName = $("#bidder-name").val();


  // Log the Bidder and Price (Even if not the highest)
  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
    database.ref().set({
      highBidder: bidderName,
      highPrice: bidderPrice
    })

    // Log the new High Price
    console.log(highPrice);



    // Store the new high price and bidder name as a local variable
    let tempHighPrice = bidderPrice;
    let tempHighBidder = bidderName;


    // Change the HTML to reflect the new high price and bidder
    $("#highest-bidder").text(tempHighBidder);
    $("#highest-price").text(tempHighPrice);

  }

  else {
    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

});
