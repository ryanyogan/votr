exports.smsify = function(str) {
  if (str.length <= 160) { return str; }
  else { return str.substr(0,157) + '...'; }
};

exports.initap = function(str) {
  return str.substring(0,1).toUpperCase() + str.substring(1);
};

exports.testint = function(str) {
  var initRegex = /^\d+$/;
  if (initRegex.test(str)) {
    return true;
  }
  return false;
};
