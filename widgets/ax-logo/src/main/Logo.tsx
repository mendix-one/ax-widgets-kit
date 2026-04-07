import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import { type ReactElement } from 'react'

import { useLogoStore } from './context'

export const Logo = observer(function Logo(): ReactElement {
  const { src, alt = 'Logo', height = 24, onClick } = useLogoStore()

  if (!src) {
    return (
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          letterSpacing: -0.5,
          cursor: onClick ? 'pointer' : 'default',
          userSelect: 'none',
        }}
        onClick={onClick}
      >
        {alt}
      </Typography>
    )
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        height,
        objectFit: 'contain',
        display: 'block',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    />
  )
})
