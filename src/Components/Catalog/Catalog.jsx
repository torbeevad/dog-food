import React, {memo, useState} from "react";
import "./index.css";
import {Card} from "../Card/Card";
import {Paginator} from "../Paginator/Paginator";

export const Catalog = memo(({items}) => {

    const [page, setPage] = useState()
    const [pageSize, setPageSize] = useState()

    const newArr = items.slice(pageSize * page - pageSize || 0, pageSize * page || 8)

    return (
        <>
            <div className="wrapper">
                {newArr?.map(el => {
                    return <Card key={el._id} product={el}/>
                })}
            </div>
            <Paginator className="paginator" setPage={setPage} setPageSize={setPageSize} total={items}/>
        </>
    )
})
