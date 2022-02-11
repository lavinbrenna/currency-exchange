export default class CurrencyConversion {
  static async getRate(query) {
    return fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${query}`
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .catch(function (error) {
        return Error(error);
      });
  }
}


