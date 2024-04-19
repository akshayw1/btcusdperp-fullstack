import React from "react";
import ReactHtmlParser from "react-html-parser";

const HtmlParser = ({ htmlContent }) => {
    
  return <div>{ReactHtmlParser(htmlContent)}</div>;
};

export default HtmlParser;
