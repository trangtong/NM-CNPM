import axios from 'axios';

export const fetchDataRackets = async (IDs) => {
  if (IDs.length === 0) return [];

  const url = `http://127.0.0.1:8002/api/v1/racket?_id=`;

  let query = '';
  IDs.map((id) => {
    if (!query) query = id;
    else query += `,${id}`;
  });

  console.log(query);
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: url + query
    })
      .then((res) => resolve(res.data.data.rackets))
      .catch((err) => reject(console.log(err)));
  });
};
