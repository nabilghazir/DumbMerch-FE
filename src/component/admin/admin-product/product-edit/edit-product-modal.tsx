import React from 'react';
import { Backdrop, Box, Modal, Fade, Typography } from '@mui/material';
import { ProductEntities } from '../../../../entities/product-entitities';
import { EditProductForm } from './edit-product-form';


interface EditProductModalProps {
    product: ProductEntities;
    open: boolean;
    onClose: () => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({ product, open, onClose }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
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
                        Edit Product
                    </Typography>
                    <EditProductForm product={product} handleClose={onClose} />
                </Box>
            </Fade>
        </Modal>
    );
};
