import Link from "next/link";
import Logo from "../components/logo/logo";
import "boxicons/css/boxicons.min.css";
import NavIcon from "./nav-icon";
import NavItem from "./nav-item";

export default function NavBar({ className, variant, href, children }) {
	const addClassName = className ? `${className}` : "";
	return (
		<Link href={href}>
			<div className={`navbar-content cursor-pointer ${addClassName}`}>
				<NavIcon variant={variant}>{variant}</NavIcon>
				<NavItem>{children}</NavItem>
			</div>
		</Link>
	);
}
