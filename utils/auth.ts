import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  id: string;
}

export const verifyToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

    // Type guard to check if decoded is DecodedToken
    if (isDecodedToken(decoded)) {
      return decoded.id;
    }

    return null;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

// Type guard function to validate DecodedToken
const isDecodedToken = (decoded: JwtPayload | string): decoded is DecodedToken => {
  return (decoded as DecodedToken).id !== undefined;
};