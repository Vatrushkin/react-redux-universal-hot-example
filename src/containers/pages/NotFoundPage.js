import React from 'react';
import Helmet from 'react-helmet';

import {NotFound} from 'components';

export default function NotFoundPage() {
  return (
    <div>
      <Helmet title="Page not found"/>
      <NotFound />
    </div>
  );
}
