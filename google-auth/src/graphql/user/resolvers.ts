import axios from "axios";
import { sign, verify } from "jsonwebtoken";
import { prismaClient } from "../../db";
import "dotenv/config";

interface GoogleAuthTokenResult {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: string;
  nbf: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: string;
  exp: string;
  jti: string;
  alg: string;
  kid: string;
  typ: string;
}

interface JwtPayload {
  id: string;
  email: string;
}

const queries = {
  generateSignedToken: async (parent: any, { token }: { token: String }) => {
    const googleOauthAPI_URL = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
    const { data } = await axios.get<GoogleAuthTokenResult>(
      googleOauthAPI_URL,
      { responseType: "json" }
    );

    let existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!existingUser) {
      const newUser = await prismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImageUrl: data.picture,
        },
      });

      existingUser = newUser;
    }

    const userPayload: JwtPayload = {
      id: existingUser.id,
      email: existingUser.email,
    };

    const signedToken = sign(userPayload, process.env.AUTH_SECRET) 
    return signedToken;
  },

  verifySignedToken: async (parent: any, {token}: {token: string}) => {
    const decode = verify(token, process.env.AUTH_SECRET)
    
    if (typeof decode === 'string' || !decode) return null;
    
    const user = await prismaClient.user.findUnique({ where: { id: decode.id }});
    return user;
  }
};

export const resolvers = { queries };
