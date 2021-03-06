import ProductController from '../controllers/product.controller';
import SalesController from '../controllers/sales.controller';
import UserController from '../controllers/user.controller';
import Authentication from '../middlewares/authentication';

const Route = (logger, router) => {
  router.post('/auth/signup', UserController.signUp);
  router.post('/auth/signin', UserController.signIn);
  
  router.get('/products', ProductController.findAll);
  router.get('/products/:productId', ProductController.findOne);
  router.get('/sales/:saleId', SalesController.findOne);
  router.get('/sales', Authentication.userToken, SalesController.findAll);

  router.post('/products', Authentication.userToken, ProductController.create);
  router.post('/sales', SalesController.create);
  
  return router;
}

export default Route;