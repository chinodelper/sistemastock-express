import routerx from 'express-promise-router';
import categoryCtrl from '../controllers/CategoryCtrl';
import auth from '../middlewares/auth';

// declarar variable indicando que vamos a usar el plugin routerx
const router = routerx();

// Declarar rutas de API para hacer referencia a cada controlador
router.post('/add', auth.verifyStockControl, categoryCtrl.add);
router.get('/query', auth.verifyStockControl, categoryCtrl.query);
router.post('/list', auth.verifyStockControl, categoryCtrl.list);
router.put('/update', auth.verifyStockControl, categoryCtrl.update);
router.delete('/remove', auth.verifyStockControl, categoryCtrl.remove);
router.put('/activate', auth.verifyStockControl, categoryCtrl.activate);
router.put('/deactivate', auth.verifyStockControl, categoryCtrl.deactivate);

export default router;