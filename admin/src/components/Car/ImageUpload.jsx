import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  IconButton, 
  Card, 
  CardMedia, 
  CardActions, 
  Grid,
  CircularProgress
} from '@mui/material';
import { 
  AddPhotoAlternate as AddPhotoIcon, 
  Delete as DeleteIcon, 
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';
import FileService from '../../services/file.service';
import { toast } from 'react-toastify';

const ImageUpload = ({ carId, initialImages = [], onImagesUpdate }) => {
  const [images, setImages] = useState(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      await uploadFiles(files);
    }
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await uploadFiles(files);
    }
  };

  // Upload files to server
  const uploadFiles = async (files) => {
    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
          toast.error(`Plik ${file.name} nie jest obrazem`);
          continue;
        }
        
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`Plik ${file.name} jest zbyt duży (max 5MB)`);
          continue;
        }
        
        // Upload file
        const uploadedImage = await FileService.uploadCarImage(file, carId);
        
        // Update images list
        setImages((prevImages) => [...prevImages, uploadedImage]);
      }
      
      // Refresh images from server
      const updatedImages = await FileService.getCarImages(carId);
      setImages(updatedImages);
      
      // Notify parent component
      if (onImagesUpdate) {
        onImagesUpdate(updatedImages);
      }
      
      toast.success('Obrazy zostały przesłane');
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Błąd podczas przesyłania obrazów');
    } finally {
      setIsUploading(false);
    }
  };

  // Delete image
  const handleDelete = async (imageId) => {
    try {
      await FileService.deleteCarImage(imageId);
      
      // Update images list
      setImages((prevImages) => prevImages.filter(img => img.id !== imageId));
      
      // Notify parent component
      if (onImagesUpdate) {
        onImagesUpdate(images.filter(img => img.id !== imageId));
      }
      
      toast.success('Obraz został usunięty');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Błąd podczas usuwania obrazu');
    }
  };

  // Set as main image
  const handleSetMain = async (imageId) => {
    try {
      await FileService.setMainImage(imageId, carId);
      
      // Update images list to reflect new main image
      const updatedImages = await FileService.getCarImages(carId);
      setImages(updatedImages);
      
      // Notify parent component
      if (onImagesUpdate) {
        onImagesUpdate(updatedImages);
      }
      
      toast.success('Główny obraz został zmieniony');
    } catch (error) {
      console.error('Error setting main image:', error);
      toast.error('Błąd podczas ustawiania głównego obrazu');
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Zdjęcia samochodu
      </Typography>
      
      {/* Drop area */}
      <Box
        sx={{
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'grey.400',
          borderRadius: 2,
          p: 3,
          mb: 3,
          textAlign: 'center',
          backgroundColor: isDragging ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        
        {isUploading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography>Przesyłanie...</Typography>
          </Box>
        ) : (
          <Box>
            <AddPhotoIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
            <Typography variant="body1" gutterBottom>
              Przeciągnij i upuść pliki lub kliknij, aby wybrać
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Maksymalny rozmiar pliku: 5MB
            </Typography>
          </Box>
        )}
      </Box>
      
      {/* Images gallery */}
      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card>
              <CardMedia
                component="img"
                height="160"
                image={image.url}
                alt={`Car image ${image.id}`}
                sx={{ objectFit: 'cover' }}
              />
              <CardActions sx={{ justifyContent: 'space-between', p: 1 }}>
                <IconButton
                  color={image.isMain ? 'primary' : 'default'}
                  onClick={() => handleSetMain(image.id)}
                  disabled={image.isMain}
                  title={image.isMain ? 'Główny obraz' : 'Ustaw jako główny'}
                >
                  {image.isMain ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(image.id)}
                  title="Usuń obraz"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {images.length === 0 && !isUploading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="textSecondary">
            Brak zdjęć. Dodaj pierwsze zdjęcie samochodu.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
