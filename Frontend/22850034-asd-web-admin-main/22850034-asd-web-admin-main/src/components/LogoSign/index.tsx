import { styled } from '@mui/material';
import Link from 'src/components/Link';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        align-items: center;
        justify-content: center;
        font-weight: ${theme.typography.fontWeightBold};
        width: 100px;
        margin: 0 auto;
        height: 40px;
`
);

function Logo() {
  return (
    <LogoWrapper href={''}>
      <img alt="logo" height={120} src="/static/images/logo/transparent.png" />
    </LogoWrapper>
  );
}

export default Logo;
