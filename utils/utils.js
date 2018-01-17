function convertStarArray(marks) {
  if(marks === '00') {
    return ['-']
  }else{
    var num = marks.substr(0, 1);
    var halfStar = marks.substr(1, 1) === '5' ? true : false;
    var arr = [];
    for (var i = 0; i < 5; i++) {
      if (i < num) {
        arr.push(1);
      } else {
        if (halfStar && i - num === 0) {
          arr.push(0.5);
        } else {
          arr.push(0);
        }
      }
    }
    // console.log(arr)
    return arr;
  }
}

module.exports = {
  convertStarArray: convertStarArray
}