import { Menu, Container, Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router"; //to detect the route we are in
import NProgress from "nprogress"; //to display a progress bar above header when changing routes
import { handleLogout } from "../../utils/auth"
//timing the progress bar from the beginning of the click till the new route
Router.onRouteChangeStart = () => NProgress.start() 
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done() // in case there is an error with the destination route


function Header({user}) {
  const router = useRouter(); //gives us an object with pathname etc.
  const isRoot = user && user.role === "root";
  const isAdmin = user && user.role === "admin";
  const isRootOrAdmin = isRoot || isAdmin


  //helper function to determine the path
  function isActive(route) {
    return route === router.pathname;
  }

  return (
    <Menu stackable fluid id="menu" inverted>
      <Container text>
        <Link href="/">
          <Menu.Item header>
            <Image
              size="mini"
              src="/static/logo.svg"
              style={{ marginRight: "1em" }}
            ></Image>
            MonteCarlo WebShop
          </Menu.Item>
        </Link>

        <Link href="/cart">
          <Menu.Item header active={isActive("/cart")}>
            <Icon name="cart" size="large"></Icon>
            Cart
          </Menu.Item>
        </Link>

        {isRootOrAdmin && (
          <Link href="/inventory">
            <Menu.Item header active={isActive("/inventory")}>
              <Icon name="cubes" size="large"></Icon>
              Inventory
            </Menu.Item>
          </Link>
        )}

        {user ? (
          <>
            <Link href="/account">
              <Menu.Item header active={isActive("/account")}>
                <Icon name="user" size="large"></Icon>
                Account
              </Menu.Item>
            </Link>

            <Menu.Item onClick={handleLogout} header>
              <Icon name="sign out" size="large"></Icon>
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href="/login">
              <Menu.Item header active={isActive("/login")}>
                <Icon name="sign in" size="large"></Icon>
                Login
              </Menu.Item>
            </Link>

            <Link href="/signup">
              <Menu.Item header active={isActive("/signup")}>
                <Icon name="signup" size="large"></Icon>
                Signup
              </Menu.Item>
            </Link>
          </>
        )}
      </Container>
    </Menu>
  );
}

export default Header;
