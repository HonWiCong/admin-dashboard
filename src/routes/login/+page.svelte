<script lang="ts">
	import { Label, Input } from 'flowbite-svelte';
	import { SignIn } from '$lib';
	import MetaTag from '../utils/MetaTag.svelte';
	import Cookies from 'js-cookie';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import { session } from '$lib/session';
	import { auth } from '$lib/firebase.client';
	import {
		signInWithPopup,
		signInWithEmailAndPassword,
		type UserCredential
	} from 'firebase/auth';

	let email: string = '';
	let password: string = '';

	async function loginWithMail() {
		const loginPromise = signInWithEmailAndPassword(auth, email, password)
			.then((result) => {
				const { user }: UserCredential = result;
				session.set({
					loggedIn: true,
					user: {
						displayName: user?.displayName,
						email: user?.email,
						photoURL: user?.photoURL,
						uid: user?.uid
					}
				});
				goto('/');
				return 'Login Successfully!';
			})
			.catch((error) => {
				throw new Error('Invalid username or password');
			});

		toast.promise(loginPromise, {
			loading: 'Logging in...',
			success: "Login Successfully!",
			error: (err) => err.message
		});
	}

	let title = 'Sign in to platform';
	let site = {
		name: 'Flowbite',
		img: '/images/flowbite-svelte-icon-logo.svg',
		link: '/',
		imgAlt: 'FlowBite Logo'
	};
	let rememberMe = true;
	let lostPassword = true;
	let createAccount = true;
	let lostPasswordLink = 'forgot-password';
	let loginTitle = 'Login to your account';
	let registerLink = 'sign-up';
	let createAccountTitle = 'Create account';

	const onSubmit = async (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);

		const data: Record<string, string | File> = {};
		for (const field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
		}

		console.log(data);

		const response = await fetch('api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const body = await response.json();

		if (body.status === 200) {
			Cookies.set('isLoggedIn', 'true', { expires: 7 });
			goto('/dashboard');
			toast.success('Login Successfully!');
		} else {
			toast.error('Invalid username or password');
		}
	};

	const path: string = '/authentication/sign-in';
	const description: string = 'Sign in example - Flowbite Svelte Admin Dashboard';
	const metaTitle: string = 'Flowbite Svelte Admin Dashboard - Sign in';
	const subtitle: string = 'Sign in';
</script>

<MetaTag {path} {description} title={metaTitle} {subtitle} />

<SignIn
	{title}
	{site}
	{rememberMe}
	{lostPassword}
	{createAccount}
	{lostPasswordLink}
	{loginTitle}
	{registerLink}
	{createAccountTitle}
	on:submit={loginWithMail}
>
	<div>
		<Label for="email" class="mb-2 dark:text-white">Your email</Label>
		<Input
			type="email"
			name="email"
			id="email"
			placeholder="name@company.com"
			required
			class="border outline-none dark:border-gray-600 dark:bg-gray-700"
			bind:value={email}
		/>
	</div>
	<div>
		<Label for="password" class="mb-2 dark:text-white">Your password</Label>
		<Input
			type="password"
			name="password"
			id="password"
			placeholder="••••••••"
			required
			class="border outline-none dark:border-gray-600 dark:bg-gray-700"
			bind:value={password}
		/>
	</div>
</SignIn>
