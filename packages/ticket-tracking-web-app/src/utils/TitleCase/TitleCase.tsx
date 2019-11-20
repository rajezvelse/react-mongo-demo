import React from 'react';

const TitleCase: React.FC<{ text: string }> = ({ text }) => {
  let formatted = ''
  if (text) formatted = text[0].toUpperCase() + text.slice(1);

  return (
    <>{formatted}</>
  );
}


export default TitleCase;
