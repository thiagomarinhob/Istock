import { Switch, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Create } from '../pages/Create';
import { Update } from '../pages/Update';
import { Movements } from '../pages/Movements';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/create" exact component={Create} />
      <Route path="/update" exact component={Update} />
      <Route path="/movement" exact component={Movements} />
    </Switch>
  )
}