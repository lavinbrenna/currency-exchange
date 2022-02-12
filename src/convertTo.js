export default class ConvertTo {
  static async convertTo(query) {
    return fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${query}/USD`
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