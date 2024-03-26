import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";
import { Box, IconButton, Slider } from "@mui/material";
import {
  Rotate90DegreesCcw,
  Rotate90DegreesCw,
  Rotate90DegreesCwOutlined,
} from "@mui/icons-material";

const EasyCrop = ({ image, setCroppedImg }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const showCroppedImage = useCallback(
    async (croppedAreaPixels) => {
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
    },
    [rotation, image]
  );

  return (
    <div>
      <div className="container">
        <div className="crop-container">
          <Cropper
            onCropComplete={(_, cropperAreaPixles) =>
              showCroppedImage(cropperAreaPixles)
            }
            image={image}
            initialCroppedAreaPixels={{
              x: 0,
              y: 0,
              width: 300,
              height: 300,
            }}
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
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />
        </div>

        <Box
          className="controls"
          mt={2}
          display={"flex"}
          gap={2}
          flexDirection={"column"}
        >
          <Box sx={{ display: "flex", gap: 3 }} flex={1}>
            <label>Rotate</label>
            <IconButton
              onClick={() => setRotation((prev) => prev + 90)}
              color="primary"
            >
              <Rotate90DegreesCwOutlined />
            </IconButton>
            <IconButton
              onClick={() => setRotation((prev) => prev - 90)}
              color="primary"
            >
              <Rotate90DegreesCcw />
            </IconButton>
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
