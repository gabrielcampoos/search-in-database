import { Box, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Cards } from './components/Cards';
import { listAllUsers, listUsers } from '../../store/modules/User/userSlice';

export const Home = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	const dispatch = useAppDispatch();

	const selectUser = useAppSelector(listUsers);

	useEffect(() => {
		dispatch(
			listAllUsers({
				name: name,
				email: email,
				phone: phone,
			}),
		);
	}, [dispatch, name, email, phone]);

	return (
		<>
			<Box
				sx={{
					width: '100%',
					height: '895px',
				}}
			>
				<Grid
					container
					spacing={{ xs: 2, sm: 2, md: 0 }}
					columns={{ xs: 12, sm: 12, md: 12 }}
					sx={{
						width: '100%',
						height: '100%',
					}}
				>
					<Grid
						item
						xs={12}
						sm={12}
						md={2}
						sx={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column',
							background: '#e8e8e8',
						}}
					>
						<Typography
							component="h1"
							variant="h6"
							sx={{ fontWeight: 700, mt: 2 }}
						>
							Filtros
						</Typography>
						<TextField
							label="Nome Cliente"
							onChange={(ev) => setName(ev.currentTarget.value)}
							value={name}
							sx={{
								mt: 1,
							}}
						/>

						<TextField
							label="E-mail"
							onChange={(ev) => setEmail(ev.currentTarget.value)}
							value={email}
							sx={{
								mt: 1,
							}}
						/>

						<TextField
							label="Telefone"
							onChange={(ev) => setPhone(ev.currentTarget.value)}
							value={phone}
							sx={{
								mt: 1,
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={10}>
						{name !== ''
							? selectUser
									.filter((user) => user.name.includes(name))

									.map(({ id, name, email, cpf, phone }) => (
										<Cards
											key={id}
											id={id}
											name={name}
											email={email}
											cpf={cpf}
											phone={phone}
										/>
									))
							: email !== ''
							? selectUser
									.filter((user) =>
										user.email.includes(email),
									)
									.map(({ id, name, email, cpf, phone }) => (
										<Cards
											key={id}
											id={id}
											name={name}
											email={email}
											cpf={cpf}
											phone={phone}
										/>
									))
							: phone !== ''
							? selectUser
									.filter((user) =>
										user.phone.includes(phone),
									)
									.map(({ id, name, email, cpf, phone }) => (
										<Cards
											key={id}
											id={id}
											name={name}
											email={email}
											cpf={cpf}
											phone={phone}
										/>
									))
							: selectUser.map(
									({ id, name, email, cpf, phone }) => (
										<Cards
											key={id}
											id={id}
											name={name}
											email={email}
											cpf={cpf}
											phone={phone}
										/>
									),
							  )}
					</Grid>
				</Grid>
			</Box>
		</>
	);
};
