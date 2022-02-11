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
    let userMoney = $('input#userDollars').val();
    clearFields();
    CurrencyConversion.getRate(query)
      .then(function (currencyResponse){
        if(currencyResponse instanceof Error){
          throw Error(`I'm sorry there was an ExchangeRate-API Error: ${currencyResponse.error} `);
        }
        const rate = currencyResponse.conversion_rate;
        displayExchangeRate(query, rate);
        displayConvertedMoney(userMoney, query, rate);
      })
      .catch(function (error){
        displayErrors(error.message);
      });
  });
});