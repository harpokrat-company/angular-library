export class TokenHeader {

  alg: string;

  typ: string;
}

export class TokenPayload {

  iss: string;

  sub: string;

  aud: string;

  exp: number;

  nbf: number;

  iat: number;

  jti: string;

  user: string;

}

export class Token {

  token: string;

  header: TokenHeader;

  payload: TokenPayload;

  signature: string;
}
