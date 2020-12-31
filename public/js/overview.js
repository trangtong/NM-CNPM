import axios from 'axios';

document.addEventListener('DOMContentLoaded', (e) => {
    try {
        const res = await axios({
          method: 'GET',
          url: 'http://127.0.0.1/best-selling',
        });
      } catch (error) {
        console.log(error);
      }
});
