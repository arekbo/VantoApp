export const safeNewDate = function (localDateTimeStr) {
    //"2024-04-27T17:47:51.335Z"
    if (localDateTimeStr) {
        const date = localDateTimeStr.split('T')[0];
        const time = localDateTimeStr.split('T')[1].split('.')[0];

        return (`${date} ${time}`);
    }

    return "Nieznana";
}