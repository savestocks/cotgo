var getGroupsURL = function(){
    let host = 'http://group.fontelira.com'; 
    if(window.location.href.indexOf('localhost') >= 0) {
        host = 'http://localhost:8080'; 
    }
    return host + '/group-api/v1/group';
}