// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  //we delay calculateResults -show the loader
  //Hide results
  document.getElementById('results').style.display = 'none'; //hide results

  //Show loader -
  //we show loader before the display the results
  document.getElementById('loading').style.display = 'block';

  //display loading time
  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

// Calculate Results
function calculateResults(e) {
  console.log('Calculating...');
  // UI Vars
  //we need to get the UI variables
  //first 3 fields Loan-Interest-Years
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  //the Results
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  //now we have all the UI - User Interface -
  //we need to do all the calculations

  //principal is actualy the amount [as a float] - we need the value not just the input
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12; //interest value as a float
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1); //monthly payment

  //we need to check if the monthly payments in a  finite number [not infinite]
  //JS has a method called isFinite to do our validation

  if (isFinite(monthly)) {
    //if finite number we want to display our results

    monthlyPayment.value = monthly.toFixed(2);
    //we want monthly to have decimals -we use JS method toFIxed(numOfDecimals)
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    //total Payment using monthly payment info
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    //Show the results -after loader spinner display
    document.getElementById('results').style.display = 'block'; //show results

    //hide the loading spinner
    document.getElementById('loading').style.display = 'none'; //hide results
  } else {
    //if not finite number -error
    showError('Please check your numbers');
  }

  // e.preventDefault();
}

//Show Error func()

function showError(error) {
  //Hide the results -in case of error
  document.getElementById('results').style.display = 'none'; //hide results

  //hide the loading spinner - in case of error
  document.getElementById('loading').style.display = 'none'; //hide loader spinner

  //Create a div
  //in Bootstrap to show an alert- class alert - plus alert-danger makes it red
  const errorDiv = document.createElement('div');

  //Get el
  const card = document.querySelector('.card'); //- we need the card -as the parent div
  const heading = document.querySelector('.heading'); // -geting the heading

  //Add calss
  errorDiv.className = 'alert alert-danger';

  //Cfreate Text Node & append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert Error above heading
  //we use the parent -[card] - use insertBefore(el we want to put in, the el where u want to insert it)
  card.insertBefore(errorDiv, heading); // insert the error before/ above heading

  //we want the error message to go away - use setTimeout(func(),miliseconds)

  //Clear Error after 2s
  setTimeout(clearError, 2000);
}

//clearEror() func()
function clearError() {
  document.querySelector('.alert').remove(); //we grab the error that has the class .alert and remove it
}
