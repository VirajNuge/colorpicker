import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function ColorChange() {
    const [cols, setCols] = useState([]);
    const [color, setColor] = useState("#000000");
    const [count, setCount] = useState(1);

    function handleColorChange(e) {
        setColor(e.target.value);

    }

    function handleAddColor() {
        if(count>5){
            window.alert("Don't Add more than 6 colors to your designs it will make your design look bad!!!");
        } else {
            setCols((prevCols) => [...prevCols, { color }]);
            setCount(count+1);
        }
    }

    function handleRemoveColor(index) {
        setCols((prevCols) => prevCols.filter((_, i) => i !== index));
    }

    function handleIndividualColorChange(index, newColor) {
        setCols((prevCols) =>
            prevCols.map((col, i) => (i === index ? { color: newColor } : col))
        );
    }

    const downloadFile = () => {
        html2canvas(document.body, {
            scrollX: 0, 
            scrollY: -window.scrollY,  
            width: document.documentElement.scrollWidth,  
            height: document.documentElement.scrollHeight, 
            x: 0,
            y: 0,
            scale: 2,  
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape', 
                unit: 'px', 
                format: [document.documentElement.scrollWidth, document.documentElement.scrollHeight]  
            });
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('website.pdf');
        });
    };

    return (
        <>
            <center><h1 className='Headline'>SHADESELECT🚀</h1></center>
            <div className="AllColors">
                <div className="ColorPicker">
                    <div className="Display" style={{ backgroundColor: color }}>
                        <p>{color} &nbsp;</p>
                        <input
                            className="Colorr"
                            type="color"
                            value={color}
                            onChange={handleColorChange}
                            style={{ backgroundColor: color }}
                        />
                    </div>
                </div>

                <ul>
                    {cols.map((savedColor, index) => (
                        <li key={index}>
                            <div className="Display" style={{ backgroundColor: savedColor.color }}>
                                <p>{savedColor.color} &nbsp;</p>
                                <input
                                    className="Colorr"
                                    type="color"
                                    value={savedColor.color}
                                    onChange={(e) => handleIndividualColorChange(index, e.target.value)}
                                    style={{ backgroundColor: savedColor.color }}
                                />
                                <button onClick={() => handleRemoveColor(index)}>✖</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <center><div className='Buttonnns'>
                <center><button onClick={handleAddColor} className="AddButton">Add Color</button> &nbsp;
                <button onClick={downloadFile} className="AddButton">Download File</button></center>
            </div></center>
            
        </>
    );
}

export default ColorChange;
