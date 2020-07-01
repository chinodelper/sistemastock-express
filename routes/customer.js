import routerx from 'express-promise-router';
import customerCtrl from '../controllers/CustomerCtrl';

// declarar variable indicando que vamos a usar el plugin routerx
const router = routerx();

// Declarar rutas de API para hacer referencia a cada controlador
router.post('/add', customerCtrl.add);
router.get('/query', customerCtrl.query);
router.get('/list', customerCtrl.list);
router.get('/list', customerCtrl.totalCustomers);
router.put('/update', customerCtrl.update);
router.delete('/remove', customerCtrl.remove);
router.put('/activate', customerCtrl.activate);
router.put('/deactivate', customerCtrl.deactivate);


export default router;