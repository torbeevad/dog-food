import React from 'react';
import {ConfigProvider, Pagination} from 'antd';

export const Paginator: React.FC = ({total, setPageSize, setPage}) => {

    const onChangeHandler = (page, pageSize) => [
        setPage(page), setPageSize(pageSize)
    ]

    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: "#7B8E98",
                colorBgTextHover: "rgba(236, 239, 241, 0.5)",
                colorPrimaryBorder: "#FFE44D",
                colorText: "#7B8E98",
            },
        }}>
            <Pagination defaultCurrent={1} defaultPageSize={8} onChange={onChangeHandler}
                        pageSizeOptions={[8, 16, 32, total.length]} total={total.length}/>
        </ConfigProvider>
    )
}