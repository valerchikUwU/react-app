import "./App.css";
import Header from "./UI/Header/Header";
import Nav from "./UI/Navigation/Nav";
import { Route, Routes } from "react-router-dom";
import New from "./UI/Content/new/New.jsx";
import Completed from "./UI/Content/completed/Completed.jsx";
import Work from "./UI/Content/work/Work.jsx";
import Content from "./UI/Content/Content.jsx";
import Main from "./UI/Main.jsx";
import NavMain from "./UI/Navigation/NavMain.jsx";
import { Navigate } from 'react-router-dom';
import StartPage from "./UI/Content/new/start/StartPage.jsx";
import BasicPage from "./UI/Content/new/basic/BasicPage.jsx";
import PersonalPage from "./UI/Content/new/personal/PersonalPage.jsx";
import DepositPage from "./UI/Content/new/deposit/DepositPage.jsx";

function App() {
  return (
    <div className="app-wrapper">
      <Header></Header>
      <Routes>
        <Route path="/*" element={<NavMain></NavMain>}></Route>

        <Route path="/user/*" element={<Nav></Nav> }></Route>

        <Route path="/admin/*" element={<Nav></Nav>}></Route>

        <Route path="/superAdmin/*" element={<Nav></Nav>}></Route>
      </Routes>

      <div className="app-wrapper-content">
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>

          <Route path="/user" element={<Navigate replace to="new/start" />}></Route>

          <Route path="/user/new" element={<Navigate replace to="start" />}></Route>
          
          <Route
            path="user/new/*"
            element={
              <Content>
                <New>
                <Routes>
                    <Route path="start"  element={<StartPage></StartPage>}></Route>
                    <Route path="basic"  element={<BasicPage></BasicPage>}></Route>
                    <Route path="personal"  element={<PersonalPage></PersonalPage>}></Route>
                    <Route path="deposit"  element={<DepositPage></DepositPage>}></Route>
                  </Routes>
                </New>
              </Content>
            }
          ></Route>

          <Route
            path="user/work"
            element={
              <Content>
                <Work></Work>
              </Content>
            }
          ></Route>

          <Route
            path="user/completed"
            element={
              <Content>
                <Completed></Completed>
              </Content>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
