import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ConvertFrom from "./convertFrom.js";
import ConvertTo from "./convertTo.js";

function clearFields() {
  $("#userDollars").val("");
  $("#userCode").val("");
  $("#usDollars").val("");
  $("select#currencyCode").val("default");
  $("#toUs").val("");
  $("#convertFromCode").val("");
  $(".exchangeOutput").text("");
  $(".convertedMoney").text("");
  $(".showErrors").text("");
}

function displayExchangeRate(q, rate) {
  $(".exchangeOutput").text(`The exchange rate from USD to ${q} is ${rate}.`);
}

function displayErrors(error) {
  $(".showErrors").text(`${error}`);
}

function displayConvertedMoney(money, q, rate) {
  let convertedAmount = parseFloat(money) / rate;
  $(".convertedMoney").text(
    `$${money} USD converted to ${q.toUpperCase()} is equal to ${convertedAmount.toFixed(2)} ${q}.`
  );
}
function displayConvertedFrom(money, q, rate){
  let convertedFromAmount = parseFloat(money) * rate;
  $(".convertedMoney").text(
    `$${money} ${q.toUpperCase()} is equal to $${convertedFromAmount.toFixed(2)}USD.`
  );

}


$(document).ready(function () {
  $('#entrySplash').show();
  $("#eyeEntrance").on('click', function(){
    $('#entrySplash').hide();
    $(".container-flex").show();
  });
  $("#convertMe, #limitedConvert, #convertToUS").on("click", function () {
    let query = $("input#userCode").val();
    let userMoney = $("input#userDollars").val();
    let limitedQuery = $("select#currencyCode option:selected").val();
    let usDollars = $("input#usDollars").val();
    let convertToQuery = $("#convertFromCode").val();
    let convertToDollars = $("#toUs").val();
    if (query != "" && userMoney != "") {
      clearFields();
      ConvertFrom.convertFrom(query)
        .then(function (currencyResponse) {
          if (currencyResponse instanceof Error) {
            throw Error(
              `I'm sorry there was an ExchangeRate-API ${currencyResponse}`
            );
          }
          const rate = currencyResponse.conversion_rate;
          displayExchangeRate(query, rate);
          displayConvertedMoney(userMoney, query, rate);
        })
        .catch(function (error) {
          displayErrors(error);
        });
    } else if (limitedQuery != "default" && usDollars != ""){
      clearFields();
      ConvertFrom.convertFrom(limitedQuery)
        .then(function (currencyResponse) {
          if (currencyResponse instanceof Error) {
            throw Error(
              `I'm sorry there was an ExchangeRate-API ${currencyResponse}`
            );
          }
          const rate = currencyResponse.conversion_rate;
          displayExchangeRate(limitedQuery, rate);
          displayConvertedMoney(usDollars, limitedQuery, rate);
        })
        .catch(function (error) {
          displayErrors(error);
        });
    }else if(convertToQuery != "" && convertToDollars !=""){
      clearFields();
      ConvertTo.convertTo(convertToQuery)
        .then(function(currencyResponse){
          if (currencyResponse instanceof Error){
            throw Error(`I'm sorry there was an ExchangeRate-API ${currencyResponse}`);
          }
          const rate = currencyResponse.conversion_rate;
          displayExchangeRate(convertToQuery, rate);
          displayConvertedFrom(convertToDollars, convertToQuery,rate);
        })
        .catch(function (error){
          displayErrors(error);
        });
    }else if (userMoney === "" || usDollars === ""||convertToDollars === "") {
      $(".showErrors").text("Please enter a valid dollar amount");
    } else if (query === "" || limitedQuery === "default" || convertToQuery === "") {
      $(".showErrors").text("Please select a currency code");
    } else {
      clearFields();
    }
  });
});
