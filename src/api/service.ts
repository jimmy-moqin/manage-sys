import request from "./index";
import qs from 'qs';
export function getBooks() {
    return request({
        url: '/getbooks',
        method: 'get',
        params: { "option": "all" }
    })
}

export function getSheets_all(date: any) {
    return request({
        url: '/getsheets',
        method: 'get',
        params: { "option": "all", "date": date }
    })
}

// export function getSheets_bigsheet(date: any) {
//     return request({
//         url: '/getsheets',
//         method: 'get',
//         params: { "option": "bigsheet", "date": date }
//     })
// }

// export function getSheets_smalluser(date: any) {
//     return request({
//         url: '/getsheets',
//         method: 'get',
//         params: { "option": "smalluser", "date": date }
//     })
// }

// export function getSheets_fixsheet(date: any) {
//     return request({
//         url: '/getsheets',
//         method: 'get',
//         params: { "option": "fixsheet", "date": date }
//     })
// }
// 
// export function getSheets_insheet(date: any) {
//     return request({
//         url: '/getsheets',
//         method: 'get',
//         params: { "option": "in", "date": date }
//     })
// }

export function createNewSheet(data: any) {
    return request({
        url: '/createsheet/',
        method: 'post',
        data: qs.stringify(data),
    })
}

export function deleteSheet(data: any) {
    return request({
        url: '/deletesheet/',
        method: 'post',
        data: qs.stringify(data),
    })
}

export function getDetail(saveindex: number) {
    return request({
        url: '/getdetail/',
        method: 'get',
        params: { "saveindex": saveindex, "option": "all" }
    })
}

export function saveSheet(data: any) {
    return request({
        url: '/savesheet/',
        method: 'post',
        data: qs.stringify(data),
    })
}

export function saveClsSheet(data: any) {
    return request({
        url: '/saveclssheet/',
        method: 'post',
        data: qs.stringify(data),
    })
}


export function getSheetCon(sheetid: any) {
    return request({
        url: '/getsheetcon/',
        method: 'get',
        params: { "option": "con", "sheetid": sheetid }
    })
}

export function getSingleSheet(sheetid: any) {
    return request({
        url: '/getsinglesheet/',
        method: 'get',
        params: { "option": "single", "sheetid": sheetid }
    })
}

export function uploadInSheet(data: any) {
    return request({
        url: '/uploadinsheet/',
        method: 'post',
        data: data,
    })
}

export function exportSheets(opt: string, sheetid: string) {
    return request({
        url: '/export/',
        method: 'get',
        params: { "option": opt, "sheetid": sheetid },
    })
}
