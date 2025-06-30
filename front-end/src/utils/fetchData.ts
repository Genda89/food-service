import axios from 'axios';

const fetchData = async ({
  url,
  method = 'get',
  data = {}
}: Partial<{ url: string; method: string; data: any }>) => {
  const path = `http://localhost:3333/${url}`;
  return await axios({
    method: method,
    url: path,
    data: data
  });
};

export default fetchData;
