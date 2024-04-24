export function load({ cookies }) {
	const isLogin = cookies.get('isLoggedIn');
	if (isLogin) {
		return { isLogin: true };
	}
}