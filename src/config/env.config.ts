export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3002,
  // el + porque usualmente las variables de entorno se guardan como strings.
  // esto se comprueba en el console.log del constructor de pokemon.service
  defaultLimit: +process.env.DEFAULT_LIMIT || 8,
});
