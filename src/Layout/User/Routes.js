import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ContentLayout from "../Content/ContentLayout";
import GameList from "../Content/GameList";
import { MovieProvider } from "../Content/MovieContext";
import MovieList from "../Content/MovieList";
import MovieListAdd from "../Content/MovieListAdd";
import MovieListEdit from "../Content/MovieListEdit";
import FooterLayout from "../FooterLayout/FooterLayout";
import HeaderLayout from "../Header/HeaderLayout";
import Login from "./Login";
import Register from "./Register";
import { UserContext } from "./UserContext";
import { Layout } from 'antd';
import Sidebar from "../Content/Sidebar";
import MovieDetail from "../Content/MovieDetail";
import MovieEdit from "../Content/MovieEdit";
import GameDetail from "../Content/GameDetail";
import { GameProvider } from "../Content/GameContext";
import GameListEdit from "../Content/GameListEdit";
import GameEdit from "../Content/GameEdit";
import GameListAdd from "../Content/GameListAdd";
const { Content } = Layout;

const Routes = () => {
  const [user] = useContext(UserContext)

  const LoginRoute = ({...props}) => {
    if(user === null) {
      return <Route {...props} />
    } else {
      return <Redirect to="/" />
    }

  }

  const PrivateRoute = ({...props}) => {
    if(user) {
      return <Route {...props} />
    } else {
      return <Redirect to="/login" />
    }
  }

  return (
    <Router>
      <HeaderLayout/><Layout>
      <Content style={{ padding: '0' }}>
        <Layout className="site-layout-background" style={{ padding: '0' }}>
          {
            user && (<Sidebar />)
          }
          <Content style={{ padding: '0 24px', minHeight: '100vh' }}>
        

        <Switch>
          <Route exact path="/"
            component={ContentLayout}
          />
          <Route exact path="/movies">
            <MovieList />
          </Route>
          <Route exact path="/games">
            <GameList />
          </Route>
          <LoginRoute exact path="/login">
            <Login />
          </LoginRoute>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/movie-list">
            <MovieList />
          </Route>
          
          <Route path="/game-detail/:gameId" component={GameDetail} exact/>
          <PrivateRoute exact path="/movie-list-edit">
            <MovieProvider>
              <MovieListEdit />
            </MovieProvider>
          </PrivateRoute>
          <PrivateRoute exact path="/movie-list-add">
            <MovieProvider>
              <MovieListAdd />
            </MovieProvider>
          </PrivateRoute>
          <PrivateRoute exact path="/game-list-add">
            <GameProvider>
              <GameListAdd />
            </GameProvider>
          </PrivateRoute>
          <PrivateRoute exact path="/game-list-edit">
            <GameProvider>
              <GameListEdit />
            </GameProvider>
          </PrivateRoute>
          <GameProvider>
            <Route path="/game-edit/:gameEditId" exact component={GameEdit} />
          </GameProvider>
          <Route path="/movie-detail/:movieId" exact component={MovieDetail} />
          <MovieProvider>
            <Route path="/movie-edit/:movieEditId" exact component={MovieEdit} />
          </MovieProvider>
          
          
        </Switch>
        </Content>
     </Layout>
       </Content>
     </Layout>
        <FooterLayout />
    </Router>
  );
}

export default Routes
