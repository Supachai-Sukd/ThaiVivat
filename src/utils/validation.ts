export const valiDateStatusParkingLot = (status: any) => {
    if (status == 'AVAILABLE' || status == 'UNAVAILABLE') return true
    else return false
}

export const valiDateCarSize = (size: any) => {
    if (size == 'SMALL' || size == 'MEDIUM' || size == 'LARGE') return true
    else return false
}

export const validateUndefined = (value: any) => {
    if (value === undefined) return false
    else return true
}