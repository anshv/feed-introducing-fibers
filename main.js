/************************ require ********************************************/
var Fiber = require('fibers');
/*****************************************************************************/

/************************ Utils **********************************************/
var colors = {
  reset: '\033[0m',
  index: [
    '\033[31m', /* red */
    '\033[32m', /* green */
    '\033[33m', /* yellow */
    '\033[34m', /* blue */
    '\033[35m'  /* magenta */
  ]
};

function print (i, msg) {
  console.log(colors.index[i-1] + i + '. ' + msg + colors.reset);
}
/*****************************************************************************/

/************************ main ***********************************************/
function doAsyncWork (i) {
  var fiber = Fiber.current;
  setTimeout(function () {
    fiber.run('result of work');
  }, 3000);

  var results = Fiber.yield();

  return results;
}

function handleRequest (i) {
  Fiber(function () {
    print(i, 'handling request');
    var results = doAsyncWork(i);
    print(i, 'after doAsyncWorkCall with result ' + results);
  }).run();
}

handleRequest(1);
handleRequest(2);
handleRequest(3);
/*****************************************************************************/
