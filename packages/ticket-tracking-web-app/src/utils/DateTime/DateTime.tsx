import React from 'react';

const DateTime: React.FC<{ dateString: string }> = ({ dateString }) => {
  let formatted = '';
  if (dateString) formatted = new Date(dateString).toLocaleDateString();

  return (
    <>{formatted}</>
  );
}

export default DateTime;
