import React, { useRef, useState, useEffect } from "react";
import { Rect, Text, Group, Transformer, Circle } from "react-konva";
import { Html } from "react-konva-utils";
import { EditableText } from "./EditableText";
import StickyPopup from "./StickyPopup";

const Sticky = ({
  x,
  y,
  width,
  height,
  text,
  draggable,
  handleDragEnd,
  onChange,
  onDelete,
  color,
  isSelected,
  isText,
  handleSelect,
  shape,
  onSelectText,
  onBorderChange,
  fontFamily
}) => {
  const shapeRef = useRef(null);
  const textRef = useRef(null);
  const deleteButtonRef = useRef(null);
  const transformStickyRef = useRef(null);
  const [fontSize, setFontSize] = useState(16);
  const inputRef = useRef(null);
  const [editingText, setEditingText] = useState(true);
  const [stickyColor, setStickyColor] = useState(color);
  const [textWriting, setTextWriting] = useState(false);
  const [textAlign, setTextAlign] = useState("left");
  const [fontfamily, setFontfamily] = useState("Arial");
  const [textUnderline,setTextUnderline]=useState(false)
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState(false);
  const [stickyStyle, setStickyStyle] = useState({
    fontWeight: "normal",
    border: false,
    fontStyle: "normal",
    // align: "center"
  });

  const handleTextAlignChange = (align) => {
    console.log(align);
    setTextAlign(align);
  };
  const handleFontFamily = (family) => {
   setFontfamily(family)
  };
  const handleBorderChange = () => {
    setStickyStyle((prevStyle) => ({
      ...prevStyle,
      border: !prevStyle.border,
      fontStyle: "bold",
    }));
  };

  const handleItalicChange = () => {
    // setStickyStyle((prevStyle) => ({
    //   ...prevStyle,
    //   fontStyle: prevStyle.fontStyle === "italic" ? "normal" : "italic",
    // }));
    setItalic(!italic);
  };

  const handleIncreaseFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize + 2);
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prevFontSize) => Math.max(prevFontSize - 2, 10));
  };
  const handleFontWightChange = () => {
    setFontWeight(!fontWeight);
  };
  let timer;

  useEffect(() => {
    if (isSelected) {
      transformStickyRef.current.nodes([
        shapeRef.current,
        textRef.current,
        deleteButtonRef.current,
      ]);
      transformStickyRef.current.getLayer().batchDraw();

      timer = setTimeout(() => {
        transformStickyRef.current.nodes([]);
      }, 15000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isSelected]);
  function colorChange(c) {
    setStickyColor(c);
  }
  function handleText() {
    setTextWriting(!textWriting);
  }

  return (
    <>
      <Group>
        {shape === "Rectangle" && (
          <Rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={stickyColor}
            // stroke="#999966"
            // strokeWidth={4}
            {...(stickyStyle.border && { stroke: "black", strokeWidth: 2 })}
            cornerRadius={10}
            draggable={draggable}
            onDragEnd={handleDragEnd}
            onClick={handleSelect}
            ref={shapeRef}
          />
        )}
        {shape === "circle" && (
          <Circle
            x={x + width / 2} // Set the x-coordinate to the center of the circle
            y={y + height / 2} // Set the y-coordinate to the center of the circle
            radius={width / 2} // Set the radius of the circle
            fill={stickyColor}
            stroke="#999966"
            strokeWidth={4}
            draggable={draggable}
            onDragEnd={handleDragEnd}
            onClick={handleSelect}
            ref={shapeRef}
          />
        )}

        {shape === "square" && (
          <Rect
            x={x}
            y={y}
            width={width}
            height={width}
            fill={stickyColor}
            stroke="#999966"
            strokeWidth={4}
            cornerRadius={10}
            draggable={draggable}
            onDragEnd={handleDragEnd}
            onClick={handleSelect}
            ref={shapeRef}
          />
        )}
        <Text
          x={x + 10}
          y={y + 10}
          width={width - 20}
          height={height - 20}
          onClick={onSelectText}
          // text={text}
          fontFamily="Calibri"
          fontSize={fontSize}
          fill="#333333"
          verticalAlign="middle"
          align={textAlign}
          // fontStyle="bold"
          draggable={draggable}
          onDragEnd={handleDragEnd}
          {...stickyStyle}
          // onDblClick={onChange}
          ref={textRef}
        />

        {isText && (
          <StickyPopup
            x={x}
            y={y-80} // Adjust the y position to show above the rectangle
            // onClose={handlePopupClose}
            onColorChange={colorChange}
            handleText={handleText}
            onDecreaseFontSize={handleDecreaseFontSize}
            onIncreaseFontSize={handleIncreaseFontSize}
            onBorderChange={handleBorderChange}
            onItalicChange={handleItalicChange}
            onTextAlignChange={handleTextAlignChange}
            onFontWeight={handleFontWightChange}
            fontFamily={handleFontFamily}
            onTextDecoration={()=>setTextUnderline(!textUnderline)}
          />
        )}
        {textWriting && (
          <EditableText
            ref={inputRef}
            x={x + 8}
            y={y + 8}
            text={text}
            width={width}
            height={height}
            isEditing={textWriting}
            onChange={onChange}
            fontSize={fontSize}
            italic={italic}
            textAlign={textAlign}
            fontWeight={fontWeight}
            fontFamily={fontfamily}
            onTextDecoration={textUnderline}

            // onKeyDown={()=>setEditingText(false)}
          />
        )}

        <Group
          x={x + width - 35}
          y={y}
          width={30}
          height={30}
          ref={deleteButtonRef}
        >
          {/* <Rect
            width={30}
            height={30}
            fill="red"
            cornerRadius={15}
            onClick={onDelete}
          />
          <Text
            x={10}
            y={5}
            text="-"
            fontFamily="FontAwesome"
            fontSize={20}
            fill="white"
            verticalAlign="middle"
            align="center"
          /> */}
        </Group>
      </Group>
      {isSelected && (
        <Transformer
          ref={transformStickyRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit minimum size of the sticky
            if (newBox.width < 50 || newBox.height < 50) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Sticky;
