import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Productlist from './pages/Productlist';
import Addproduct from './pages/Addproduct';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/admin/productlist" component={PageAuth(Productlist)} />
                <Route path="/admin/add-product" component={PageAuth(Addproduct)} />
                {/* Other routes */}
            </Switch>
        </Router>
    );
}

export default App;
