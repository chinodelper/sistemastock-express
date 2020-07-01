import routerx from 'express-promise-router';
import saleCtrl from '../controllers/SaleCtrl';
import auth from '../middlewares/auth';

// declarar variable indicando que vamos a usar el plugin routerx
const router = routerx();

// Declarar rutas de API para hacer referencia a cada controlador
router.post('/add', auth.verifySeller, saleCtrl.add);
router.get('/query', auth.verifySeller, saleCtrl.query);
router.post('/list', auth.verifySeller, saleCtrl.list);
router.get('/listDates', auth.verifySeller, saleCtrl.listDates);
router.post('/yearGraph', auth.verifyUser, saleCtrl.yearGraph);
router.post('/totalSales', auth.verifyUser, saleCtrl.totalSales);
router.post('/totalSalesMonth', auth.verifyUser, saleCtrl.totalSalesMonth);
router.put('/activate', auth.verifySeller, saleCtrl.activate);
router.put('/deactivate', auth.verifySeller, saleCtrl.deactivate);

export default router;