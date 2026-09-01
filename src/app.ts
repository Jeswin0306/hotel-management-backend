import express from "express";
import healthrouter from './routes/health.routes';
import guestRouter from './routes/guest.routes';
import roomTypeRouter from './routes/roomType.routes'
import roomRouter from './routes/rooms.routes';
import authRouter from './routes/auth.router';
import bookingRouter from './routes/booking.routes'

const app = express();
app.use(express.json())

app.use(express());

app.use('/api', healthrouter);
app.use('/api', guestRouter);
app.use('/api', roomTypeRouter);
app.use('/api', roomRouter);
app.use('/api', authRouter);
app.use('/api', bookingRouter);

export default app;