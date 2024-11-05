import React, { useState } from 'react';
import { Backdrop, Box, Modal, Fade, Button, Typography } from '@mui/material';
import { CreateCategoryForm } from './admin-create-category-form';

export const CreateCategoryModal: React.FC = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Create Category</Button>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography variant="h6" component="h2">
                            Create New Category
                        </Typography>
                        <CreateCategoryForm handleClose={handleClose} />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};
