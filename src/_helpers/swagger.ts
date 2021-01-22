import express  from 'express';
import * as swaggerUi from 'swagger-ui-express';

const router = express.Router();
import YAML from 'yamljs'
const swaggerDocument = YAML.load('../../src/swagger.yaml');
// tslint:disable-next-line:no-console
console.log('TESTSETES')
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router