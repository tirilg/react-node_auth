/**
 * Custom Authenticator helper
 */
function isAuthenticated(req, res, next) {
  try {
    if (req.session.user) {
      console.log("Authenticated");
      next();
    } else {
      res.status(403).send({response: "Unauthorized"})
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { isAuthenticated };
