import * as nodeGeocoder from 'node-geocoder';
import * as dotenv from 'dotenv';

dotenv.config();

const geocoder = nodeGeocoder({
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_APIKEY,
});

export default geocoder;
