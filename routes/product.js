import routerx from 'express-promise-router';
import productCtrl from '../controllers/ProductCtrl';
import auth from '../middlewares/auth';

// declarar variable indicando que vamos a usar el plugin routerx
const router = routerx();

// Declarar rutas de API para hacer referencia a cada controlador
router.post('/add', auth.verifyStockControl, productCtrl.add);
router.get('/query', auth.verifyStockControl, productCtrl.query);
router.post('/queryCode', auth.verifyUser, productCtrl.queryCode);
router.post('/list', auth.verifyStockControl, productCtrl.list);
router.post('/totalProducts', auth.verifyStockControl, productCtrl.totalProducts);
router.put('/update', auth.verifyStockControl, productCtrl.update);
router.delete('/remove', auth.verifyStockControl, productCtrl.remove);
router.put('/activate', auth.verifyStockControl, productCtrl.activate);
router.put('/deactivate', auth.verifyStockControl, productCtrl.deactivate);

export default router;