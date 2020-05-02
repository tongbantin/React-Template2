import React from 'react';
import { Table } from 'reactstrap';
import '../../assets/css/common-style.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import '../../assets/css/Table.css';
export const ReactTable = (props) => {
    return (
        <React.Fragment>
            <Table responsive hover className="border-solid">
                <thead>
                    <tr>
                        {props.Header}
                    </tr>
                </thead>
                <tbody>
                    {props.Row}
                </tbody>
            </Table>
        </React.Fragment>
    )
}
export const ChildTable = (props) => {
    return (
        <React.Fragment>
            <div className='table-container'>
                <BootstrapTable
                    keyField={props.keyField}
                    data={props.data}
                    columns={props.columns}
                    bordered={false}
                    noDataIndication="Data have 0 record"
                />
            </div>
        </React.Fragment>
    )
}
export const CommonTable = (props) => {   
    const { SearchBar } = Search;
    return (
        <React.Fragment>
            <ToolkitProvider
            keyField={props.keyField}
            data={props.data}
            columns={props.columns} 
            
            search
            
            >
            {
                props => (
                <div>

                    <SearchBar { ...props.searchProps } />
                    <hr />
                    <BootstrapTable
                    { ...props.baseProps }
                    noDataIndication="Data have 0 record"
                    pagination={paginationFactory()}
                    bordered={false}
                    />
                </div>
                )
            }
            </ToolkitProvider>
            
        </React.Fragment>
    )
}

export default CommonTable