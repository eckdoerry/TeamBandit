import {React, useState} from "react";
import { Document, Page, pdfjs } from "react-pdf";

import MyPDF from './Policies.pdf';
import styles from "./InfoAndPolicies.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



const InfoAndPolicies = ({courseInfo}) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages })
    {
        setNumPages( numPages );
    }
    
    return(
        <div style={{padding: '25px'}}>
            <Document  file={MyPDF} onLoadError={console.error} onLoadSuccess={onDocumentLoadSuccess}>
                <div className = {styles.page} >
                        {Array.from(new Array(numPages), (el, index) => (
                        <Page width="1000" className = {styles.pages} key={`page_${index + 1}`} pageNumber={index + 1}/>
                    ))}
                </div>
            </Document>
        </div>
    );
}

export default InfoAndPolicies;