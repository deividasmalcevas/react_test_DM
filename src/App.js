import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import HomePage from "./pages/HomePage";
import Nav from "./components/Nav";
import Register from "./components/Register";
import UserPostPage from "./pages/UserPostPage";
import SinglePostPage from "./pages/SinglePostPage";
import CreatePostPage from "./pages/CreatePostPage";
import FavPage from "./pages/FavPage";


function App() {
    return (
        <div className="bg-dark text-light min-vh-100">
            <div className="container">
                <BrowserRouter>
                    <Nav/>
                    <div className="row">
                        <Routes>
                            <Route element={<HomePage/>} path="/"></Route>
                            <Route element={<Register/>} path="/register"></Route>
                            <Route element={<UserPostPage/>} path="/posts/:name"></Route>
                            <Route element={<SinglePostPage/>} path="/posts/:name/:id"></Route>
                            <Route element={<CreatePostPage/>} path="/create"></Route>
                            <Route element={<FavPage/>} path="/favorites"></Route>
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;