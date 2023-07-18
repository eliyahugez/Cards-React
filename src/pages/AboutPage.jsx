import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "../components/PageHeader";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";

const AboutPage = () => {
  return (
    <Container>
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center">
          <Paper
            variant="outlined"
            sx={{ padding: 3 }}
          >
            Description:

            The website is a platform that showcases business cards to users. Regular users can browse the site and view information about various businesses and like the cards they are interested in. Business users have the additional capability to create new business cards and add relevant information. Admin users can manage the different users, edit or delete them, and change their status to business users or vice versa.

            The technologies used to build the website include React.js and Node.js for the client-side and server-side respectively, along with JavaScript as the programming language. The site also utilizes the MUI (Material-UI) library to provide pre-designed styles and components.

            The design of the website is pleasant and calming, allowing users to focus on the content and their actions in a comfortable and clear manner.

            The website primarily focuses on presenting business information, and there are no additional content sections apart from the business data itself.
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: { md: "flex", xs: "none" }, justifyContent: "center" }}
        >
          <img src="/assets/images/card.jpg" alt="card" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
