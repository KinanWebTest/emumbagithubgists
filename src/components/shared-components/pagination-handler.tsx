import { styled } from '@mui/material'
import AppButton from './app-button';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { pageSize } from '../../const-urls';
import { themeColor } from './app-theme';
import { useRef } from 'react';

export const StyledPaginationContainer = styled('div')(() => `
  width: 90vw;
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
);

export const FlexOneDiv = styled('div')(() => `
  display: flex;
  flex-direction: row;
`
);

export const StyledPageInputContainer = styled('div')(() => `
  display: flex;
  flex-direction: row;
  color: black;
`
);

export const StyledPageInput = styled('input')(() => `
  border: 1px solid ${themeColor};
  color: ${themeColor};
  background-color: white;
  margin: 0px 5px;
  max-width: 20px;
  text-align: center;
  border-radius: 5px
`
);

const PageInput = ({
  onPageChange,
  page,
}: {
  page: number,
  onPageChange: (newPage: number) => void,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: { target: { value: string } }) => {
    if (e.target.value === '') return;
    const inputVal = e.target.value;
    const inputInt = parseInt(inputVal);
    if (inputRef?.current) {
      if (typeof inputInt === 'number') {
        onPageChange(inputInt || 1)
        inputRef.current.defaultValue = '' + inputInt;
      } else {
        inputRef.current.value = '' + page;
      }
    }
  };

  return(
    <StyledPageInputContainer>
      {`Page`}
      <StyledPageInput
        ref={inputRef}
        defaultValue={page}
        onChange={handleChange}
      />
      {`gists ${page * pageSize} to ${(page * pageSize) + pageSize}`}
    </StyledPageInputContainer>
  );
}

const PaginationHandler = ({
  onPageChange,
  page,
}: {
  onPageChange: (newPage: number) => void,
  page: number
}) => {
  return (
    <StyledPaginationContainer>
      <FlexOneDiv />
      <FlexOneDiv>
        {page > 1 && <AppButton
          onClick={() => onPageChange(page - 1)}
          colored={true}
          buttonText={<>
            <WestIcon sx={{marginRight: '5px'}}/>
            Last Page
          </>}
        />}
        <AppButton
          onClick={() => onPageChange(page + 1)}
          colored={true}
          buttonText={<>
            Next Page
            <EastIcon sx={{marginLeft: '5px'}}/>
          </>}
        />
      </FlexOneDiv>
      <FlexOneDiv>
        <PageInput page={page} onPageChange={onPageChange}/>
      </FlexOneDiv>
    </StyledPaginationContainer>
  )
}

export default PaginationHandler;