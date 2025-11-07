import React from 'react';

const NextImageMock: React.FC<any> = (props) => {
  // Simple passthrough to img for Storybook/TS type safety
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <img {...props} />;
};

export default NextImageMock;

