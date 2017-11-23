var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var times = ['12:00','13:00', '14:00'];
// var attributes = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var getLength = function(arr) {
  value = arr.length;
  arr.length = getRandomInt(0, value);
  return arr;
};
// var k = [1, 2, 3, 4, 5, 6, 7, 8];
var advert = [];
for (var i = 0; i <= 8; i++) {
  var attributes = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  advert[i] = {
    'author': 'img/avatars/user{{0' + getRandomInt(0,8) + '}}.png',
    'offer': {
      'title': titles[getRandomInt(0,8)],
      'address': '{{location.x}}, {{location.y}}',
      'price': getRandomInt(1000,1000000),
      'type': types[getRandomInt(0,2)],
      'rooms': getRandomInt(1,5),
      'guests': getRandomInt(1,100),
      'checkin': times[getRandomInt(0,2)],
      'checkout': times[getRandomInt(0,2)],
      'features': getLength(attributes),
      'description': '',
      'photos': []
    },
    'location':{
      'x': getRandomInt(300,900),
      'y': getRandomInt(100,500)
    }
  };
}
console.log(advert);
