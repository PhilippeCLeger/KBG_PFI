class QueryStringBuilder{
    constructor(){
        this.sortDatesDesc = true;
    }


    getQueryString(previousQueryString = ""){
        previousQueryString += `${previousQueryString.length == 0 ? "" : "&"}sort=Date${this.sortDatesDesc ? ",desc" : ""}`;
        previousQueryString = `?${previousQueryString}`;
        console.log(previousQueryString);
        return previousQueryString;
    }
}