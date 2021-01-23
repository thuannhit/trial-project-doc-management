/* eslint-disable prettier/prettier */
const environments: any = {};
environments.development = {
  port: 3000,
  database: `${process.env.DEV_MONGODB}`,
  envName: "Development enviroment",
  jwtAccessSecretKey: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpires: process.env.JWT_ACCESS_TIMEOUT,
  jwtRefreshSecretKey: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpires: process.env.JWT_REFRESH_TIMEOUT,
  site: "http://127.0.0.1:3000",
};
environments.production = {
  port: 8000,
  database: `${process.env.PROD_MONGODB}`,
  envName: "Production enviroment",
  jwtAccessSecretKey: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpires: process.env.JWT_ACCESS_TIMEOUT,
  jwtRefreshSecretKey: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpires: process.env.JWT_REFRESH_TIMEOUT,
  site: "https://abc.com.vn",
};
// tslint:disable-next-line:no-console
// console.log('environments', environments)
const currentEnvironment = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.production;

// Export Module
export default environmentToExport;
