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

function displayExchangeRate(query,rate){
  $(".exchangeOutput").text(`The exchange rate from USD to ${query} is ${rate}.`);
}

function displayErrors(error){
  $('.showErrors').text(`${error}`);
}

function displayConvertedMoney(userMoney,query,rate){
  let convertedAmount = userMoney / rate;
  $('.convertedMoney').text(`$${userMoney} converted to ${query} is equal to ${convertedAmount.toFixed(2)} ${query}`);
}

$(document).ready(function(){
  $('#convertMe').on('click', function(){
    let query = $('input#userCode').val();
    console.log(query);
    let userMoney = $('input#userDollars').val();
    if(userMoney=== ""){
      $('.showErrors').text('Please enter a valid number');
    }else if(query === ""){
      $(".showErrors").text('Please enter a three letter currency code');
    }
    else if((query === "") && (userMoney=== "")){
      $('.showErrors').text('Please enter a number and three letter currency code!');
    }else{
      clearFields();
      CurrencyConversion.getRate(query)
        .then(function (currencyResponse){
          if(currencyResponse instanceof Error){
            console.log(currencyResponse);
            throw Error(`I'm sorry there was an ExchangeRate-API Error: ${currencyResponse} `);
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