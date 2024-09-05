import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

export default function ContentComponent() {
    const [content1, setContent1] = useState('Content for box 1');
    const [content2, setContent2] = useState('Content for box 2');
    const [content3, setContent3] = useState('Content for box 3');
    const [isEditing, setIsEditing] = useState(false);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Container sx={styles.container}>
            {/* Button Group */}
            <Box sx={styles.buttonsContainer}>
                <Button variant="outlined">About</Button>
                <Button variant="outlined">Publications</Button>
                <Button variant="outlined">Professional</Button>
                <Button variant="outlined">Teaching/Research</Button>
            </Box>

            {/* Content Boxes */}
            <Box sx={styles.boxesContainer}>
                <Box sx={styles.box}>
                    {isEditing ? (
                        <TextField
                            value={content1}
                            style={styles.textarea}
                            onChange={(e) => setContent1(e.target.value)}
                            multiline
                            fullWidth
                            variant="outlined"
                        />
                    ) : (
                        <Typography>{content1}</Typography>
                    )}
                </Box>
                <Box sx={styles.box}>
                    {isEditing ? (
                        <TextField
                            value={content2}
                            style={styles.textarea}
                            onChange={(e) => setContent2(e.target.value)}
                            multiline
                            fullWidth
                            variant="outlined"
                        />
                    ) : (
                        <Typography>{content2}</Typography>
                    )}
                </Box>
                <Box sx={styles.box}>
                    {isEditing ? (
                        <TextField
                            value={content3}
                            style={styles.textarea}
                            onChange={(e) => setContent3(e.target.value)}
                            multiline
                            fullWidth
                            variant="outlined"
                        />
                    ) : (
                        <Typography>{content3}</Typography>
                    )}
                </Box>
            </Box>

            {/* Edit Button */}
            <Button variant="contained" sx={styles.editButton} onClick={handleEditToggle}>
                {isEditing ? 'Save' : 'Edit'}
            </Button>
        </Container>
    );
}

// Styles
const styles = {
    textarea: {
        width: "100%",
        height: "100%"
    },
    container: {
        border: '1px solid #ccc',
        padding: '10px',
        position: 'relative',
        width: 'calc(100% - 80px)', // Adjust width to account for sidebar
        marginLeft: '80px',
        height: 'auto',
        minHeight: '600px',
        backgroundColor: '#fff',
    },
    buttonsContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '10px',
    },
    boxesContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        height: '100%',
    },
    box: {
        height: '150px',
        border: '1px solid #ccc',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButton: {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
    },
};
