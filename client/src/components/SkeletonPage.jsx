import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CARDS } from '../utils/queries';
import CardCanvas from '../components/CardCanvas';

const SkeletonPage = () => {    
    return (
        <div>
            Skeleton
        </div>
    );  
}

export default SkeletonPage;