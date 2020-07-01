import routerx from 'express-promise-router';
import categoryRouter from './category';
import productRouter from './product';
import userRouter from './user';
import customerRouter from './customer';
import personRouter from './person';
import entryRouter from './entry';
import saleRouter from './sale';

// instanciamos plugin roouterx
const router = routerx();

// indicar que los controladores de categoria se van a llamar desde '/category' en la API
router.use('/customer', customerRouter);

// indicar que los controladores de categoria se van a llamar desde '/category' en la API
router.use('/category', categoryRouter);

// indicar que los controladores de producto se van a llamar desde '/product' en la API
router.use('/product', productRouter);

// indicar que los controladores de Usuario se van a llamar desde '/user' en la API
router.use('/user', userRouter);

// indicar que los controladores de Personas se van a llamar desde '/person' en la API
router.use('/person', personRouter);

// indicar que los controladores de Ingresos se van a llamar desde '/entry' en la API
router.use('/entry', entryRouter);

// indicar que los controladores de Ventas se van a llamar desde '/sale' en la API
router.use('/sale', saleRouter);

// exportamos router
export default router;