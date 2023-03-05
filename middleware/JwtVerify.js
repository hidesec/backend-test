import jwt from 'jsonwebtoken';

export class JwtVerify {
    // Define a middleware for verifying JWT
    verifyToken(req, res, next) {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }

      // Verify the token
      jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
          return res.status(401).json({ error: 'Invalid token' });
        }

        // Attach the decoded payload to the request object
        req.userId = decoded.id;
        next();
      });
    }
}