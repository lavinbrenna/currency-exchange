import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyConversion from './currency.js';

function clearFields(){
  $('#userDollars').val("");
  $('#userCode').val("");
  $('.showErrors').text("");
}

function displayExchangeRate(q,rate){
  $(".exchangeOutput").text(`The exchange rate from USD to ${q} is ${rate}.`);
}

function displayErrors(error){
  $('.showErrors').text(`${error}`);
}

function displayConvertedMoney(money,q,rate){
  let convertedAmount = parseFloat(money) / rate;
  $('.convertedMoney').text(`$${money} converted to ${q} is equal to ${convertedAmount.toFixed(2)} ${q}`);
}

$(document).ready(function(){
  $('#convertMe').on('click', function(){
    let query = $('input#userCode').val();
    let userMoney = $('input#userDollars').val();
    if((query === "") && (userMoney=== "")){
      $('.showErrors').text('Please enter a number and three letter currency code!');
    }else if(query ===""){
      $(".showErrors").text('Please enter a three letter currency code');
    }
    else if(userMoney === ""){
      $(".showErrors").text('Please enter a valid dollar amount');
    }
    else{
      clearFields();
      CurrencyConversion.getRate(query)
        .then(function (currencyResponse){
          if(currencyResponse instanceof Error){
            throw Error(`I'm sorry there was an ExchangeRate-API ${currencyResponse}`);
          }
          const rate = currencyResponse.conversion_rate;
          displayExchangeRate(query, rate);
          displayConvertedMoney(userMoney, query, rate);
        })
        .catch(function (error){
          displayErrors(error);
        });
    }
  });
});