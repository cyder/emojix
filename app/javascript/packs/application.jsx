import React from 'react';
import { render } from 'react-dom';

import App from '../app/app';

render(
  <App />,
  document.body.appendChild(document.createElement('div')),
);