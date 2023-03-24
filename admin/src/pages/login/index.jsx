/* eslint-disable react-hooks/exhaustive-deps */
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import {
	Avatar,
	CssBaseline,
	FormControl,
	Grid,
	InputLabel,
	OutlinedInput,
	TextField,
	Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Box, Container } from "@mui/system";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { guest } from "../../createInstance";
import { resetState } from "../../slice/AuthSlice";
import "./index.scss";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { error, msg, isFetching } = useSelector((state) => state.auth);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newUser = {
			email,
			password: password,
		};
		await loginUser(newUser, dispatch, navigate);
	};

	useEffect(() => {
		guest
			.get("/auth/get-info")
			.then((res) => {
				if (res.data !== "Not_login") {
					loginUser(res.data, dispatch, navigate);
				}
			})
			.catch((err) => {});

		return () => {
			dispatch(resetState());
		};
	}, []);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: blue[500] }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<FormControl sx={{ mt: 1 }} fullWidth>
						<InputLabel htmlFor="outlined-adornment-password">
							Password
						</InputLabel>
						<OutlinedInput
							required
							id="outlined-adornment-password"
							name="password"
							type="password"
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							label="Password"
						/>
					</FormControl>
					{error ? <div className="login_msg">{msg}</div> : <></>}

					<LoadingButton
						loading={isFetching}
						onClick={(e) => handleSubmit(e)}
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</LoadingButton>
					<Grid container>
						<Grid item xs></Grid>
						<Grid item>
							<Link to="/forgot-password" variant="body2">
								Forgot password?
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;
