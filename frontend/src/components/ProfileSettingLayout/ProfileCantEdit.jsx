import React, { useState } from 'react';
import styles from './ProfileCantEdit.module.css';
import { TextField, Button, Avatar, Card, CardHeader, CardContent, Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';

const ProfileCantEdit = ({ profile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (field, value) => {
    onSave({ ...profile, [field]: value });
  };

  const handleSaveClick = () => {
    // Save the edited profile (e.g., send to server)
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader
          avatar={<Avatar src={profile.photo} alt="Profile" className={styles.photo} />}
          title={<Typography variant="h5">{profile.fullName}</Typography>}
          subheader={
            <>
              <Typography variant="body2">Title: {profile.title}</Typography>
              <Typography variant="body2">Affiliation: {profile.affiliation}</Typography>
            </>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className={styles.fieldContainer}>
                <Typography variant="body2" className={styles.fieldLabel}>Full Name:</Typography>
                <TextField
                  value={profile.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  InputProps={{ readOnly: !isEditing }}
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.fieldContainer}>
                <Typography variant="body2" className={styles.fieldLabel}>Last Name:</Typography>
                <TextField
                  value={profile.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  InputProps={{ readOnly: !isEditing }}
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.fieldContainer}>
                <Typography variant="body2" className={styles.fieldLabel}>Preferred Name:</Typography>
                <TextField
                  value={profile.preferredName}
                  onChange={(e) => handleInputChange('preferredName', e.target.value)}
                  InputProps={{ readOnly: !isEditing }}
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.fieldContainer}>
                <Typography variant="body2" className={styles.fieldLabel}>E-mail Address:</Typography>
                <TextField
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled
                  // fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.fieldContainer}>
                <Typography variant="body2" className={styles.fieldLabel}>ORCID ID:</Typography>
                <TextField
                  value={profile.orcid}
                  disabled
                  onChange={(e) => handleInputChange('orcid', e.target.value)}
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.fieldContainer}>
                <Typography variant="body2" className={styles.fieldLabel}>Linkedin:</Typography>
                <TextField
                  value={profile.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  disabled
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" className={styles.affiliationsHeader}>Affiliations:</Typography>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.fieldContainer}>
                <Typography variant="body2" className={styles.fieldLabel}>Name:</Typography>
                <TextField
                  value={profile.affiliations}
                  onChange={(e) => handleInputChange('affiliations', e.target.value)}
                  InputProps={{ readOnly: !isEditing }}
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={styles.fieldContainer}>
                <Typography variant="body2" className={styles.fieldLabel}>Role and Title:</Typography>
                <TextField
                  value={profile.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  InputProps={{ readOnly: !isEditing }}
                  fullWidth
                />
              </div>
            </Grid>
          </Grid>
          <div className={styles.buttonRow}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flex:1 }}>
              <EmailIcon sx={{color: 'lightgray'}}/>
              <Button variant="contained" disabled={!isEditing} className={styles.secondaryButton}>+Add Secondary Email Address</Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flex:1 }}>
              <EmailIcon sx={{color: 'lightgray'}}/>
              <Button variant="contained" disabled={!isEditing} className={styles.secondaryButton}>+Add Secondary Affiliation</Button>
            </Box>
            
            
          </div>

          <Box sx={{ display: 'flex', marginTop: '20px', gap: '20px' }}>
            <Button variant="contained" color="primary" onClick={isEditing ? handleSaveClick : handleEditClick} className={styles.editButton}>
              {isEditing ? 'Save' : 'Edit'}
            </Button>
            <Typography variant="body2" className={styles.note}>
              Please note! Most of the details are populated via Tuakiri and cannot be changed here.
            </Typography>
          </Box>
          
          
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCantEdit;