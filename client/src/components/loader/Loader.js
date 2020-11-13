import React, { Fragment } from 'react';
import spinner from "../../img/spinner.gif";
import './Loader.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Fragment>
    <div class="loader_center">
    <div class="loader book">
      <figure class="page"></figure>
      <figure class="page"></figure>
      <figure class="page"></figure>
</div>
</div>

<h1>Reading</h1>
  </Fragment>
);