import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout, Menu, theme } from 'antd';
import { useSelector } from "react-redux"
import { Outlet, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { AiOutlineShoppingCart, AiFillDatabase, AiTwotoneDelete, AiOutlineAppstoreAdd, AiOutlineEnter, AiOutlineOrderedList } from 'react-icons/ai'
import { BiCategory, BiSolidCartAdd } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { IoIosArrowDropdown } from 'react-icons/io'
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()

  const categoryState = useSelector((state) => state.auth.user.user)
  // console.log(categoryState);

  return (
    <Layout >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo mb-2" style={{ fontFamily: 'Courier, monospace' }}>
          <h2 className="text-white fs-2 text-center py-3">
            <span className="sm-logo" style={{ fontSize: '20px', textAlign: 'center', paddingTop: '7px', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>HIKAR</span>
            <span className="lg-logo" style={{ fontWeight: 'bolder', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }} >HIKAR</span>
          </h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key)
            }
          }}
          items={[
            {
              key: '',
              icon: <AiFillDatabase className="fs-4" />,
              label: 'Inventory',
            },
            {
              key: 'add-remove',
              icon: <AiOutlineAppstoreAdd className="fs-4" />,
              label: 'Add Or Remove From Inventory',
            },
            {
              key: 'items-in',
              icon: <AiOutlineEnter className="fs-4" />,
              label: 'Items In',
            },
            {
              key: 'items-out',
              icon: <AiTwotoneDelete className="fs-4" />,
              label: 'Items Out',

            },

            {
              key: 'Products',
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: 'Products',
              children: [
                {
                  key: 'product',
                  icon: <BiSolidCartAdd className="fs-4" />,
                  label: 'Add Product',
                },

                {
                  key: 'category',
                  icon: <BiCategory className="fs-4" />,
                  label: 'Add Category',
                },
                {
                  key: 'category-list',
                  icon: <AiOutlineOrderedList className="fs-4" />,
                  label: 'Category List',
                }
              ]
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="d-flex gap-3 align-items-center dropdown">
              <div className='fs-5'>
                <FaUserAlt />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className='d-flex align-items-center gap-2'
              >
                <div>
                  <h5 className="mb-0">{categoryState.name}</h5>
                  <p className="mb-0">{categoryState.email}</p>
                </div>
                <div className='flex fs-5'>
                  <IoIosArrowDropdown />
                </div>
              </div>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={() => {
                      localStorage.removeItem('user');
                    }}
                    to="/"
                  >
                    Log out
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 100px',
            padding: 50,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
          
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout >
  );
};
export default MainLayout;
