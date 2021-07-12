let requestURL = new URL('https://api.exchangerate.host/latest');
requestURL.searchParams.set('base', 'USD');
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var response = request.response;
  console.log(response);
}