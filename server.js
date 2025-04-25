import express from 'express';
import cors from 'cors';
import { Astronomy } from 'astronomy-engine';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sun', (req, res) => {
  const { date, lat, lon } = req.body;
  try {
    const dt = new Date(date);
    const time = Astronomy.MakeTime(dt);
    const observer = new Astronomy.Observer(lat, lon, 0);
    const equ = Astronomy.Equator('Sun', time, observer, true, true);
    const ecl = Astronomy.Ecliptic(equ);
    const sunLongitude = ecl.elon;
    res.json({ sunLongitude });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка сервера', details: e.message });
  }
});

app.listen(3000, () => console.log('Сервер запущен на порту 3000'));
