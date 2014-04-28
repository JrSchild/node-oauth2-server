

module.exports = runner;

/**
 * Run through the sequence of functions
 *
 * @param  {Function} next
 * @public
 */
function runner (fns, context, next) {
  var last = fns.length - 1;

  (function run(pos) {
    fns[pos].call(context, function (err) {
      if (err) {
        if (err.headers) context.res.set(err.headers);
        return context.res.json(err.code, err);
      }
      if (pos === last) return next();
      run(++pos);
    });
  })(0);
}
