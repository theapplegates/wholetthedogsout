import * as React from "react"
import { Link } from "gatsby"
import Search from "./search"
const searchIndices = [{ name: `Pages`, title: `Pages` }]


const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

return (
	<div className="global-wrapper" data-is-root-path={isRootPath}>
		<header className="global-header"><Search indices={searchIndices} />
{header}
</header>
<script src="https://kit.fontawesome.com/96d943cb0f.js" crossorigin="anonymous"></script>
		<main>{children}</main>
		<footer>
			© {new Date().getFullYear()}, Built with
			{` `}
			<a href="https://www.gatsbyjs.com">Gatsby</a>    <a href="https://keybase.io/mrapplegate/pgp_keys.asc?fingerprint=6baa889e776a98666978aec42b09e41ca4faf350">My PGP/GPG key<i class="fa-thin fa-key"></i></a>
		</footer>
	</div>
)
}

export default Layout
