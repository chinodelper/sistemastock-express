import routerx from 'express-promise-router';
import entryCtrl from '../controllers/EntryCtrl';
import auth from '../middlewares/auth';

// declarar variable indicando que vamos a usar el plugin routerx
const router = routerx();

// Declarar rutas de API para hacer referencia a cada controlador
router.post('/add', auth.verifyStockControl, entryCtrl.add);
router.get('/query', auth.verifyStockControl, entryCtrl.query);
router.post('/list', auth.verifyStockControl, entryCtrl.list);
router.get('/listDates', auth.verifyStockControl, entryCtrl.listDates);
router.post('/yearGraph', auth.verifyUser, entryCtrl.yearGraph);
router.put('/activate', auth.verifyStockControl, entryCtrl.activate);
router.put('/deactivate', auth.verifyStockControl, entryCtrl.deactivate);

export default router;