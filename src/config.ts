/* eslint-disable prettier/prettier */
const environments: any = {};
environments.development = {
  port: 3000,
  database: `${process.env.DEV_MONGODB}`,
  envName: "Development enviroment",
  site: "http://localhost:3000",
};
environments.production = {
  port: 8000,
  database: `${process.env.PROD_MONGODB}`,
  envName: "Production enviroment",
  site: "https://abc.com.vn",
};
// tslint:disable-next-line:no-console
console.log('ETEST', process.env.NODE_ENV)
const currentEnvironment = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.production;

// Export Module
export default environmentToExport;
