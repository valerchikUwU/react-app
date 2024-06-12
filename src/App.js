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
import NavAdmin from "./UI/Navigation/admin/NavAdmin.jsx";
import { Navigate } from "react-router-dom";
import StartPage from "./UI/Content/new/start/StartPage.jsx";
import BasicPage from "./UI/Content/new/basic/BasicPage.jsx";
import PersonalPage from "./UI/Content/new/personal/PersonalPage.jsx";
import DepositPage from "./UI/Content/new/deposit/DepositPage.jsx";
import Archive from "./UI/Content/admin/archive/Archive.jsx";
import PriceList from "./UI/Content/admin/priceList/PriceList.jsx";
import Users from "./UI/Content/admin/users/Users.jsx";
import Deposits from "./UI/Content/admin/deposits/Deposits.jsx";
import Orders from "./UI/Content/admin/orders/Orders.jsx";
import Statistics from "./UI/Content/superAdmin/statistics/Statistics.jsx";
import Commission from "./UI/Content/superAdmin/commission/Commission.jsx";
import Review from "./UI/Content/superAdmin/review/Review.jsx";
import Reciever from "./UI/Content/superAdmin/reciever/Reciever.jsx";
import NavSuperAdmin from "./UI/Navigation/superAdmin/NavSuperAdmin.jsx";

function App() {
  return (
    <div className="app-wrapper">
      <Header></Header>
      <Routes>
        <Route path="/*" element={<NavMain></NavMain>}></Route>

        <Route path=":accountId/user/*" element={<Nav></Nav>}></Route>

        <Route
          path=":accountId/admin/*"
          element={<NavAdmin></NavAdmin>}
        ></Route>
        
        <Route path=":accountId/superAdmin/*" element={<NavSuperAdmin></NavSuperAdmin>}></Route>
      </Routes>

      <div className="app-wrapper-content">
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>

          <Route
            path=":accountId/user"
            element={<Navigate replace to="new/start" />}
          ></Route>

          <Route
            path=":accountId/user/new"
            element={<Navigate replace to="start" />}
          ></Route>

          <Route
            path=":accountId/user/new/*"
            element={
              <Content>
                <New>
                  <Routes>
                    <Route
                      path="start"
                      element={<StartPage></StartPage>}
                    ></Route>
                    <Route
                      path="basic"
                      element={<BasicPage></BasicPage>}
                    ></Route>
                    <Route
                      path="personal"
                      element={<PersonalPage></PersonalPage>}
                    ></Route>
                    <Route
                      path="deposit"
                      element={<DepositPage></DepositPage>}
                    ></Route>
                  </Routes>
                </New>
              </Content>
            }
          ></Route>

          <Route
            path="/:accountId/user/work"
            element={
              <Content>
                <Work></Work>
              </Content>
            }
          ></Route>

          <Route
            path="/:accountId/user/completed"
            element={
              <Content>
                <Completed></Completed>
              </Content>
            }
          ></Route>

          <Route
            path="/:accountId/admin/*"
            element={
              <Content>
                <Routes>
                  <Route path="orders" element={<Orders></Orders>}></Route>
                  <Route path="archive" element={<Archive></Archive>}></Route>
                  <Route
                    path="priceList"
                    element={<PriceList></PriceList>}
                  ></Route>
                  <Route path="users" element={<Users></Users>}></Route>
                  <Route
                    path="deposits"
                    element={<Deposits></Deposits>}
                  ></Route>
                </Routes>
              </Content>
            }
          ></Route>

          <Route
            path="/:accountId/superAdmin/*"
            element={
              <Content>
                <Routes>
                  <Route
                    path="comission"
                    element={<Commission></Commission>}
                  ></Route>
                   <Route
                    path="statistics"
                    element={<Statistics></Statistics>}
                  ></Route>
                   <Route
                    path="review"
                    element={<Review></Review>}
                  ></Route>
                   <Route
                    path="reciever"
                    element={<Reciever></Reciever>}
                  ></Route>
                </Routes>
              </Content>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
