var restify    = require('restify');

/**
 * Checks the presence of the mandatory parameters in a request
 * @param req the request
 * @param paramNames array of string - the mandatory parameters names
 * @return false when no parameter is missing
 *         oherwise a MissingParameterError when at least one parameter is missing
 */
exports.detectMissingParameter = function (req, paramNames)
{
  for (var i = paramNames.length - 1; i >= 0; i--)
  {
    if (!req.params.hasOwnProperty(paramNames[i]))
    {
      return new restify.MissingParameterError('Missing parameter ' + paramNames[i]);
    }
  }
  return false;
}

/**
 * Handle error message
 *  @param err an error object
 */
exports.handleError = function (err)
{
  var errObj = err;
  if (err.err) {
    errObj = err.err; // unnest error when required
  }
  console.log("An error occured: " + errObj);
  return next(new restify.InternalError(errObj));
}