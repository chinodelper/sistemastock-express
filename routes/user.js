import routerx from 'express-promise-router';
import userCtrl from '../controllers/UserCtrl';
import auth from '../middlewares/auth';

// declarar variable indicando que vamos a usar el plugin routerx
const router = routerx();

// Declarar rutas de API para hacer referencia a cada controlador
router.post('/add', auth.verifyAdmin, userCtrl.add);
router.get('/query', auth.verifyUser, userCtrl.query);
router.post('/list', auth.verifyAdmin, userCtrl.list);
router.put('/update', auth.verifyUser, userCtrl.update);
router.delete('/remove', auth.verifyAdmin, userCtrl.remove);
router.put('/activate', auth.verifyAdmin, userCtrl.activate);
router.put('/deactivate', auth.verifyAdmin, userCtrl.deactivate);
router.post('/login', userCtrl.login);

export default router;