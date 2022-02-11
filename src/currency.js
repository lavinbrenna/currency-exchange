export default class CurrencyConversion {
  static async getRate(query) {
    return fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${query}`
    )
      .then(function (response) {
        if (!response.ok) {
          if(response.status === 403){
            throw Error("invalid API Key");
          }
          else if (response.status === 404){
            throw Error("unsupported currency code");
          }
          else{
            throw Error(response.status);
          }
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }
}


