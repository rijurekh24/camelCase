import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";
import { Box, Slider } from "@mui/material";

const EasyCrop = ({ image, setCroppedImg }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      setCroppedImg(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  return (
    <div>
      <div className="container">
        <div className="crop-container">
          <Cropper
            onCropAreaChange={showCroppedImage}
            image={image}
            cropShape="round"
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            zoomSpeed={0.3}
            maxZoom={3}
            zoomWithScroll={true}
            showGrid={true}
            aspect={5 / 5}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />
        </div>
        <Box className="controls" mt={2} display={'flex'} gap={2}>
          <Box sx={{ display: "flex", gap: 3 }} flex={1}>
            <label>Rotate</label>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="rotate"
              onChange={(e, rotation) => setRotation(rotation)}
              className="range"
            />
          </Box>
          <Box sx={{ display: "flex", gap: 3 }} flex={1}>
            <label>Zoom</label>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="zoom"
              onChange={(e, zoom) => setZoom(zoom)}
              className="range"
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default EasyCrop;
