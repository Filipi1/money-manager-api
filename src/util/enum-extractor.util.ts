export class EnumConversor {
    static convertToObject(enumToConvert) {
        var result = {}
        const keys = Object.keys(enumToConvert)
        keys.forEach((key, index) => {
            if (index < keys.length / 2)
                result[keys[index + keys.length / 2]] = Number.parseInt(key)
        })
        return result
    }
}