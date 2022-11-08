export default function FilterData( queryData, data ) {
    const filteredDataProvince =
        queryData === ""
            ? data
            : data.filter((items) =>
                    items.province.toLowerCase().includes(queryData.toLowerCase())
            )
    return filteredDataProvince
}