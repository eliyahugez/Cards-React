import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, Link, IconButton, SpeedDial, SpeedDialIcon, SpeedDialAction, Divider } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import useCards from '../hooks/useCards';
import { Call, Delete, Favorite, ModeEdit } from '@mui/icons-material';
import { useUser } from '../../users/providers/UserProvider';
import CardDeleteDialog from '../components/card/CardDeleteDialog';
import { deleteCard, getCard } from '../services/cardApiService'
import ROUTES from '../../routes/routesModel';
import { useSnackbar } from '../../providers/SnackbarProvider';


const CardDetailPage = () => {

  const { id } = useParams();
  const { value: { card }, handleGetCard } = useCards();
  const { user } = useUser();
  const [isDialogOpen, setDialog] = useState(false);
  const navigate = useNavigate();
  const { handleLikeCard } = useCards();
  const snack = useSnackbar();
  const [isLike, setLike] = useState(false)

  useEffect(() => {
    handleGetCard(id);
  }, [id]);

  useEffect(() => {
    getCard(id).then(id => {
      const cardLikes = id.likes
      if (id.likes.includes(user._id)) {
        setLike(!cardLikes)
      } else {
        setLike(false)
      }
    })
  }, [id]);

  const handleLike = async () => {
    setLike(!isLike);
    await handleLikeCard(id);
    snack("Card LIKE Success", "info");
    if (isLike) {
      snack("Card DISLIKE Success", "info");
    }

  };

  const handleDeleteCard = () => {
    handleDialog();
    deleteCard(id);
    navigate(ROUTES.CARDS);
    snack("Card Delete Success", "success");



  }

  const handleDialog = term => {
    if (term === 'open') return setDialog(true)
    setDialog(false)
  }


  const actions = [
    {
      icon: <IconButton
        aria-label="edit card"
        onClick={() =>
          navigate(`${ROUTES.EDIT_CARD}/${id}`)
        }
      >
        <ModeEdit />
      </IconButton>, name: 'Edit'
    },


    {
      icon: <IconButton
        aria-label="delete card"
        onClick={() => handleDialog("open")}
      >
        <Delete />
      </IconButton>, name: 'Delete'
    },

    {
      icon: <IconButton
        aria-label="add to favorites"
        onClick={handleLike}
      >
        <Favorite color={isLike ? "error" : "inherit"} />
      </IconButton>, name: 'Favorite'
    },

    { icon: <Call />, name: 'Call' },
  ];

  return (
    <>
      {card &&
        <Paper elevation={3} sx={{ padding: 4, position: "relative", minHeight: "92vh" }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item lg={6} xs={12} md={6}>
              <div style={{ position: 'relative', paddingTop: '75%', overflow: 'hidden', borderRadius: '8px' }}>
                <img src={card.image.url} alt={card.image.alt} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </Grid>
            <Grid item lg={3} xs={12} md={3}>
              <Divider variant="middle" sx={{ marginBottom: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{card.title}</Typography>
              <Typography variant="subtitle1" sx={{ fontStyle: 'italic', color: 'gray', marginBottom: 2 }}>
                {card.subtitle}
              </Typography>
              <Typography sx={{ marginBottom: 2 }}>{card.description}</Typography>
              <Divider variant="middle" sx={{ marginBottom: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Contact Information:</Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Phone:</strong> {card.phone}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Email:</strong> {card.email}
              </Typography>
              <Typography variant="body1">
                <strong>Website:</strong> <Link href={card.web}>{card.web}</Link>
              </Typography>
            </Grid>
            <Grid item lg={3} xs={12} md={3}>
              <Divider variant="middle" sx={{ marginBottom: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{"Address"}</Typography>
              <Typography sx={{ marginBottom: 2 }}>{card.address.country}</Typography>
              <Typography sx={{ marginBottom: 2 }}>{card.address.city}</Typography>
              <Typography sx={{ marginBottom: 2 }}>{card.address.street}</Typography>
              <Typography sx={{ marginBottom: 2 }}>{card.address.houseNumber}</Typography>
              <Typography sx={{ marginBottom: 2 }}>{card.address.zip}</Typography>
            </Grid>
          </Grid>

          {user && (user._id === card.user_id || user.isAdmin === true) && (
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{
                position: 'fixed',
                bottom: '15vh',
                right: '2vw',
              }}
              icon={<SpeedDialIcon />}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                />
              ))}
            </SpeedDial>
          )}
        </Paper>


      }
      <CardDeleteDialog
        isDialogOpen={isDialogOpen}
        onDelete={handleDeleteCard}
        onChangeDialog={handleDialog}
      />
    </>
  );
};

export default CardDetailPage;
