import { FC, useRef, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { ContentCopyIcon, VisibilityOff } from "../../components/Icons/MuiIcons"
import { MoreVertSharp } from "../../components/Icons/MuiIcons"
import { ViewOnVoyagerIcon } from "../../components/Icons/ViewOnVoyagerIcon"
import Row, { RowCentered } from "../../components/Row"
import { routes } from "../../routes"
import { normalizeAddress } from "../../services/addresses"
import { useOnClickOutside } from "../../services/useOnClickOutside"
import { openVoyagerAddress } from "../../services/voyager.service"
import { useCurrentNetwork } from "../networks/useNetworks"
import {
  IconWrapper,
  Menu,
  MenuContainer,
  MenuItem,
  MenuItemWrapper,
  Separator,
} from "./AccountMenu"

const StyledMenuContainer = styled(MenuContainer)`
  flex: 1;
  text-align: right;
`

const StyledMenu = styled(Menu)`
  top: 120%;
  right: 5%;
`

const MoreVertWrapper = styled(RowCentered)`
  align-items: center;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
`

export const TokenMenu: FC<{ tokenAddress: string }> = ({ tokenAddress }) => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const currentNetwork = useCurrentNetwork()

  useOnClickOutside(ref, () => setMenuOpen(false))

  return (
    <StyledMenuContainer id="token-menu-container" style={{}} ref={ref}>
      <Row style={{ justifyContent: "flex-end" }}>
        <MoreVertWrapper onClick={() => setMenuOpen(!isMenuOpen)}>
          <MoreVertSharp />
        </MoreVertWrapper>
      </Row>
      {isMenuOpen && (
        <StyledMenu>
          <CopyToClipboard
            text={normalizeAddress(tokenAddress)}
            onCopy={() => setMenuOpen(false)}
          >
            <MenuItemWrapper>
              <MenuItem>
                <ContentCopyIcon fontSize="inherit" htmlColor="white" />
                Copy address
              </MenuItem>
            </MenuItemWrapper>
          </CopyToClipboard>
          <Separator />
          <MenuItemWrapper
            onClick={() => openVoyagerAddress(currentNetwork, tokenAddress)}
          >
            <MenuItem>
              <ViewOnVoyagerIcon />
              View on Voyager
            </MenuItem>
          </MenuItemWrapper>
          <Separator />
          <MenuItemWrapper
            onClick={() => navigate(routes.hideToken(tokenAddress))}
          >
            <MenuItem>
              <IconWrapper>
                <VisibilityOff fontSize="inherit" htmlColor="white" />
              </IconWrapper>
              Hide this token
            </MenuItem>
          </MenuItemWrapper>
        </StyledMenu>
      )}
    </StyledMenuContainer>
  )
}
