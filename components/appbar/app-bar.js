export default function AppBar({ children }) {
	return (
		<div className="appbar">
			<div className="py-5 text-center bg-white">
				<a>
					<b>{children}</b>
				</a>
			</div>
		</div>
	);
}
