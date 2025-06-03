import express from 'express';
import cors from 'cors';
import UserRoute from './routes/UserRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import CategorieRoute from './routes/CategorieRoute.js';
import ExpeditionRoute from './routes/ExpeditionRoute.js';
import OrderRoute from './routes/OrderRoute.js';
import DashboardRoute from './routes/DashboardRoute.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(CategorieRoute);
app.use(ExpeditionRoute);
app.use(OrderRoute);
app.use('/dashboard', DashboardRoute);
app.listen(5000, () => console.log('Server up and running...'));
