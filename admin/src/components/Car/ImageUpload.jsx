import React, { useState } from 'react';
import FileService from '../../services/file.service';
import { toast } from 'react-toastify';
import './imageUpload.css';

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
        if (!file.type.startsWith('image/')) {
          toast.error(`File ${file.name} is not an image`);
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`File ${file.name} is too large (max 5MB)`);
          continue;
        }
        await FileService.uploadCarImage(file, carId);
      }
      // Refresh images from server
      const updatedImages = await FileService.getCarImages(carId);
      setImages(updatedImages);
      if (onImagesUpdate) {
        onImagesUpdate(updatedImages);
      }
      toast.success('Images uploaded successfully');
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Error uploading images');
    } finally {
      setIsUploading(false);
    }
  };

  // Delete image
  const handleDelete = async (imageId) => {
    try {
      await FileService.deleteCarImage(imageId);
      const updated = images.filter(img => img.id !== imageId);
      setImages(updated);
      if (onImagesUpdate) {
        onImagesUpdate(updated);
      }
      toast.success('Image deleted');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Error deleting image');
    }
  };

  // Set as main image
  const handleSetMain = async (imageId) => {
    try {
      await FileService.setMainImage(imageId, carId);
      const updatedImages = await FileService.getCarImages(carId);
      setImages(updatedImages);
      if (onImagesUpdate) {
        onImagesUpdate(updatedImages);
      }
      toast.success('Main image set');
    } catch (error) {
      console.error('Error setting main image:', error);
      toast.error('Error setting main image');
    }
  };

  return (
    <div className={`rentivaAdminImageUpload${isUploading ? ' rentivaAdminImageUpload--loading' : ''}`}> 
      <div className="rentivaAdminImageUpload__header">
        <span className="rentivaAdminImageUpload__icon" role="img" aria-label="image">🖼️</span>
        <span className="rentivaAdminImageUpload__title">Car Images</span>
      </div>
      {/* Drop area */}
      <div
        className={`rentivaAdminImageUpload__dropzone${isDragging ? ' rentivaAdminImageUpload__dropzone--dragActive' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
        tabIndex={0}
        role="button"
        aria-label="Upload images"
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          className="rentivaAdminImageUpload__hiddenInput"
          onChange={handleFileChange}
        />
        <div className="rentivaAdminImageUpload__dropzoneContent">
          {isUploading ? (
            <>
              <div className="rentivaAdminImageUpload__loadingSpinner" />
              <span className="rentivaAdminImageUpload__uploadText">Uploading...</span>
            </>
          ) : (
            <>
              <span className="rentivaAdminImageUpload__uploadIcon" role="img" aria-label="add-photo">📷</span>
              <span className="rentivaAdminImageUpload__uploadText">Drag & drop files or click to select</span>
              <span className="rentivaAdminImageUpload__uploadSubtext">Max file size: 5MB</span>
              <button
                type="button"
                className="rentivaAdminImageUpload__browseButton"
                onClick={e => { e.stopPropagation(); document.getElementById('file-input').click(); }}
              >Browse</button>
            </>
          )}
        </div>
      </div>
      {/* Images gallery */}
      <div className="rentivaAdminImageUpload__preview">
        {images.length > 0 && (
          <div>
            <div className="rentivaAdminImageUpload__previewTitle">Gallery</div>
            <div className="rentivaAdminImageUpload__previewGrid">
              {images.map((image) => (
                <div className="rentivaAdminImageUpload__previewItem" key={image.id}>
                  <img
                    src={image.url}
                    alt={`Car image ${image.id}`}
                    className="rentivaAdminImageUpload__previewImage"
                  />
                  <button
                    className="rentivaAdminImageUpload__removeButton"
                    title="Delete image"
                    onClick={e => { e.stopPropagation(); handleDelete(image.id); }}
                  >
                    ×
                  </button>
                  <button
                    className="rentivaAdminImageUpload__removeButton"
                    title={image.isMain ? 'Main image' : 'Set as main'}
                    style={{ top: '32px', right: '4px', background: image.isMain ? '#C3845E' : '#393939', color: image.isMain ? '#fff' : '#C3845E' }}
                    onClick={e => { e.stopPropagation(); if (!image.isMain) handleSetMain(image.id); }}
                    disabled={image.isMain}
                  >
                    {image.isMain ? '★' : '☆'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {images.length === 0 && !isUploading && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: '#a6a6a6' }}>
            No images. Add the first car image.
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
