import React from 'react'
import { Skeleton } from '@mui/material'

const UseSkeleton = (type = null, height = 20, width = 50) => {

    return (
        <Skeleton animation="wave" variant={type === 'text' ? 'text' : 'rectangular'}
            width={width} height={height} />
    )
}
export default UseSkeleton