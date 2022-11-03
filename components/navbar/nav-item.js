export default function NavItem({ children }) {
	return (
		<span className="text-xs pt-1 font-thin">
			<b>{children}</b>
		</span>
	);
}
