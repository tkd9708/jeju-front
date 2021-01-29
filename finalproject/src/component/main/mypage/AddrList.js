import React, {memo} from 'react';

const AddrList = memo(({list}) => {
    
    return list.map((d,i) => <li key={i}>{d}</li>);
});

export default AddrList;