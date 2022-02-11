import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import CurrencyConversion from "./currency.js";

function clearFields() {
  $("#userDollars").val("");
  $("#userCode").val("");
  $(".showErrors").text("");
  $("#usDollars").val("");
  $("select#currencyCode").val("default");
  $(".exchangeOuput").text("");
  $(".convertedMoney").text("");
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
    `$${money} converted to ${q} is equal to ${convertedAmount.toFixed(2)} ${q}`
  );
}

$(document).ready(function () {
  $("#convertMe, #limitedConvert").on("click", function () {
    let query = $("input#userCode").val();
    let userMoney = $("input#userDollars").val();
    let limitedQuery = $("select#currencyCode option:selected").val();
    let usDollars = $("input#usDollars").val();
    if (query != "" && userMoney != "") {
      clearFields();
      CurrencyConversion.getRate(query)
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
      CurrencyConversion.getRate(limitedQuery)
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
    } else if (userMoney === "" || usDollars === "") {
      $(".showErrors").text("Please enter a valid dollar amount");
    } else if (query === "" || limitedQuery === "default") {
      $(".showErrors").text("Please select a currency code");
    } else {
      clearFields();
    }
  });
});
