// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import axios from 'axios';
// import { port, host } from './config';
// import App from './src/components/App';
//
// const serverRender = () =>
//   axios.get(`http://${host}:${port}/api/users`)
//     .then(resp => {
//       return ReactDOMServer.renderToString(
//         <App initialUsers={resp.data.users} />
//       );
//     });
//
// export default serverRender;
