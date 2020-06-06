import React from 'react';
function ComboData({data}){
    const filteredArr = data&&data.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
    return(
        <React.Fragment>
            <option value="">-- SELECT --</option>
            {filteredArr && filteredArr.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
            ))}
        </React.Fragment>
    )
}

export default ComboData