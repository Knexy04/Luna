export const phoneFilter = (phone) => {
    if (phone[0] === "+") {
        return phone.slice(2).replace(/\D/g, "")
    } else {
        return phone.slice(1).replace(/\D/g, "")
    }
}