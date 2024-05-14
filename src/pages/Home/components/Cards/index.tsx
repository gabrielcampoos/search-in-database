/* eslint-disable @typescript-eslint/no-unused-vars */
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

interface CardsProps {
	id: string;
	name: string;
	email: string;
	cpf: string;
	phone: string;
}

export const Cards = ({ id, name, email, cpf, phone }: CardsProps) => {
	return (
		<>
			<Grid item xs={12} md={12} lg={4}>
				<Card
					variant="outlined"
					id={id}
					sx={{
						boxShadow: '1px 1px 10px  #6e5fa2',
					}}
				>
					<CardHeader title={`Nome Cliente: ${name}`} />

					<CardContent>
						<Typography>{`E-mail: ${email}`}</Typography>
					</CardContent>
					<CardContent>
						<Typography>Cpf: {cpf}</Typography>
						<Typography>Telefone: {phone}</Typography>
					</CardContent>
				</Card>
			</Grid>
		</>
	);
};
