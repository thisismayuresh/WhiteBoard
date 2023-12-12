import React, { useState } from 'react';
import { Popover } from 'react-bootstrap';
import { BsCCircle, BsSquare, BsStickiesFill } from 'react-icons/bs';
import { DrawingColors } from "../../utils/DrawingColor";

const CustomStickyPopover = ({ setSelectedColor, handleAddNote }) => {

  const [selectedShape, setSelectedShape] = useState(null);


  /* Function to drop the note where the current mouse pointer is   */
  const handleAreaClick = (event, shape) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    console.log("selected shape")
    console.log(mouseX);
    console.log(mouseY);
    handleAddNote(mouseX, mouseY, shape);
    setSelectedShape(shape);
  };
  return (
    <Popover id="popover-basic">
      <Popover.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}> {/*vertical popover body*/}
      {DrawingColors.map((color) => (
            <div
              key={color.color}
              onClick={() => setSelectedColor(color.color)}
              style={{
                display:'flex',
                flexDirection:'column', 
                backgroundColor: color.color,
                borderRadius: '0',
                width: '24px',
                height: '24px',
                margin: '6px',
                cursor: 'pointer',
                boxShadow: selectedShape === color.color ? '0 0 0 2px #000' : 'none',
              }}
              title={color.title}
            ></div>
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          <div
            onClick={(event) => {
              handleAreaClick(event, 'Rectangle');
              setSelectedShape('Rectangle');
            }}

            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: selectedShape === 'Rectangle' ? DrawingColors.color : 'transparent',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BsStickiesFill style={{ cursor: 'pointer' }} />
          </div>
          <div
            onClick={(event) => {
                handleAreaClick(event, 'circle');
                setSelectedShape('circle');
              }}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: selectedShape === 'circle' ? DrawingColors.color : 'transparent',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BsCCircle style={{ cursor: 'pointer' }} />
          </div>
          <div
           onClick={(event) => {
            handleAreaClick(event, 'square');
            setSelectedShape('square');
          }}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: selectedShape === 'square' ? DrawingColors.color : 'transparent',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BsSquare style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );
};

export default CustomStickyPopover;