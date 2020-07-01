import routerx from 'express-promise-router';
import personCtrl from '../controllers/PersonCtrl';
import auth from '../middlewares/auth';

// declarar variable indicando que vamos a usar el plugin routerx
const router = routerx();

// Declarar rutas de API para hacer referencia a cada controlador
router.post('/add', auth.verifyUser, personCtrl.add);
router.get('/query', auth.verifyUser, personCtrl.query);
router.post('/list', auth.verifyUser, personCtrl.list);
router.post('/totalClients', auth.verifyUser, personCtrl.totalClients);
router.post('/listClients', auth.verifyUser, personCtrl.listClients);
router.post('/listProviders', auth.verifyUser, personCtrl.listProviders);
router.put('/update', auth.verifyUser, personCtrl.update);
router.delete('/remove', auth.verifyUser, personCtrl.remove);
router.put('/activate', auth.verifyUser, personCtrl.activate);
router.put('/deactivate', auth.verifyUser, personCtrl.deactivate);

export default router;