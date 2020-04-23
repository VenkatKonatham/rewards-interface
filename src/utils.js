export default class Utils {
    static total = (list = [], field) => list.reduce((last, curr) => last + (curr[field] || 0), 0)
}