import { TravelTimeClient } from 'traveltime-api';
import * as dotenv from 'dotenv';

dotenv.config();

const travelTimeClient = new TravelTimeClient({
  apiKey: process.env.TRAVELTIME_APIKEY,
  applicationId: process.env.TRAVELTIME_APPID,
});

export default travelTimeClient;
