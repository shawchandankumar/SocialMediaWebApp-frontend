export function getFormData (params) {
    let formData = [];

    for (let property in params) {
        let encodedKey = encodeURIComponent(property); // user name => user%20name
        let encodedValue = encodeURIComponent(params[property]);
        
        formData.push(`${encodedKey}=${encodedValue}`);
    }

    return formData.join('&');
}