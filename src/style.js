import styled from 'styled-components';

export const Container = styled.div`
  margin: 100px auto;
  border: 1px solid #CCC;
  border-radius: 1em;
  background-color: ${props => props.color};
  width: ${props => props.width}px;
  height: 200px;
`;