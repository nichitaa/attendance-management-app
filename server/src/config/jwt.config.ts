const JwtConfig = {
  secret: 'SecretKey',
  jwtExpiration: 3600,           // 1 hour
  jwtRefreshExpiration: 86400,   // 24 hours
};

export default JwtConfig;